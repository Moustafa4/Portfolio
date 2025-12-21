import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  effect,
  computed,
  signal,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
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
  imports: [CommonModule],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectDetails {
  // @ViewChild('allTab') allTab!: ElementRef<HTMLDivElement>;

  private route = inject(ActivatedRoute);
  private proService = inject(ProjectServices);

  private swiperInited = false;
  itemstoshow = signal(1);

  project = toSignal<IProjects | null>(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.proService.getuserbyid(id))
    )
  );
  similarProjects = toSignal<IProjects[]>(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) =>
        this.proService
          .getuserbyid(id)
          .pipe(
            switchMap((currentProject) =>
              this.proService
                .getProjectByType()
                .pipe(
                  map((projects) =>
                    projects.filter(
                      (p) =>
                        p.id !== currentProject.id &&
                        p.type.toLowerCase() === currentProject.type.toLowerCase()
                    )
                  )
                )
            )
          )
      )
    )
  );

  similarProjectsslice = computed(() => this.similarProjects()?.slice(0, this.itemstoshow()));
  similarProjectslen = computed(() => this.similarProjects()?.length || 0);
  // similarProjects = toSignal<IProjects[]>(
  //   this.route.paramMap.pipe(
  //     map((params) => Number(params.get('id'))),
  //     switchMap((id) =>
  //       this.proService
  //         .getuserbyid(id)
  //         .pipe(
  //           switchMap((currentProject) =>
  //             this.proService
  //               .getProjectByType()
  //               .pipe(
  //                 map((projects) =>
  //                   projects.filter(
  //                     (p) =>
  //                       p.id !== currentProject.id &&
  //                       p.techStack.some((type) => currentProject.type.includes(type))
  //                   )
  //                 )
  //               )
  //           )
  //         )
  //     )
  //   )
  // );
  loadmore() {
    this.itemstoshow.set(this.itemstoshow() + 1);
  }
  loadless() {
    this.itemstoshow.set(1);
  }

  constructor() {
    effect(() => {
      if (this.project() && !this.swiperInited) {
        this.swiperInited = true;

        queueMicrotask(() => {
          const thumbsSwiper = new Swiper('.mySwiper', {
            loop: true,
            spaceBetween: 30,
            slidesPerView: 2,
            freeMode: true,
            watchSlidesProgress: true,
          });

          new Swiper('.mySwiper2', {
            loop: true,
            spaceBetween: 40,

            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
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
              // stretch:1,
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
