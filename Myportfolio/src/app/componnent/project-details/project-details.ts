import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, effect, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectServices } from '../../Services/project-services';
import { IProjects } from '../home_parts/proj-home/iprojects';
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';

register();

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectDetails {

  private route = inject(ActivatedRoute);
  private proService = inject(ProjectServices);

  private swiperInited = false;
  itemstoshow = signal(1);

  project = toSignal<IProjects | null>(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.proService.getProjectById(id))
    )
  );
  similarProjects = toSignal<IProjects[]>(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) =>
        this.proService.getProjectById(id).pipe(
          switchMap((currentProject) => {
            if (!currentProject) {
       
              return of([]);
            }
            return this.proService
              .getProjectByType()
              .pipe(
                map((projects) =>
                  projects.filter(
                    (p) =>
                      p.id !== currentProject.id &&
                      p.type.toLowerCase() === currentProject.type.toLowerCase()
                  )
                )
              );
          })
        )
      )
    )
  );

  similarProjectsslice = computed(() => this.similarProjects()?.slice(0, this.itemstoshow()));
  similarProjectslen = computed(() => this.similarProjects()?.length || 0);
  
  loadMore() {
    const width = window.innerWidth;
    if (width <= 600) {
      this.itemstoshow.set(this.itemstoshow() + 2);
    } else if (width <= 1024) {
      this.itemstoshow.set(this.itemstoshow() + 3);
    } else {
      this.itemstoshow.set(this.itemstoshow() + 3);
    }
  }
  seeLess() {
    if (window.innerWidth <= 768) {
      this.itemstoshow.set(1);
    } else if (window.innerWidth >= 769 && window.innerWidth <= 991) {
      this.itemstoshow.set(2);
    } else {
      this.itemstoshow.set(3);
    }
  }
  updateItemsToShow() {
    const width = window.innerWidth;

    if (width <= 600) {
      this.itemstoshow.set(1);
    } else if (width <= 1024) {
      this.itemstoshow.set(2);
    } else {
      this.itemstoshow.set(3);
    }
  }

  constructor() {
    this.updateItemsToShow();

    window.addEventListener('resize', () => {
      this.updateItemsToShow();
    });
    effect(() => {
      if (this.project() && !this.swiperInited) {
        this.swiperInited = true;

        queueMicrotask(() => {
          const thumbsSwiper = new Swiper('.mySwiper', {
            loop: true,
            spaceBetween: 20,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
          });

          new Swiper('.mySwiper2', {
            loop: true,
            spaceBetween: 40,

            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              addIcons: true,
            },
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
            },
            effect: 'coverflow',
            coverflowEffect: {
              rotate: 20,
              slideShadows: true,
              depth: 6000,
              scale: 300,
              stretch:1,
            },
            autoplay: {
              delay: 5000,
              pauseOnMouseEnter: true,
              disableOnInteraction: true,
              waitForTransition: true,
            },
            thumbs: {
              swiper: thumbsSwiper,
            },
          });
        });
      }
    });
  }
}
