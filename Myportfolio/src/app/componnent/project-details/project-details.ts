import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, effect } from '@angular/core';
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
  private route = inject(ActivatedRoute);
  private proService = inject(ProjectServices);

  private swiperInited = false;

  project = toSignal<IProjects | null>(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.proService.getuserbyid(id))
    )
  );

  constructor() {
    effect(() => {
      if (this.project() && !this.swiperInited) {
        this.swiperInited = true;

        queueMicrotask(() => {
          const thumbsSwiper = new Swiper('.mySwiper', {
            loop: true,
            spaceBetween: 90,
            slidesPerView:2,
            freeMode: true,
            watchSlidesProgress: true,
          });

          new Swiper('.mySwiper2', {
            loop: true,
            spaceBetween: 20,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
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
