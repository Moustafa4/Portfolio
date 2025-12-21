import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
  Signal,
  ViewChild,
} from '@angular/core';
import { ProjectServices } from '../../../Services/project-services';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { IProjects } from './iprojects';

@Component({
  selector: 'app-proj-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], //deprecated
  providers: [ProjectServices],
  templateUrl: './proj-home.html',
  styleUrl: './proj-home.css',
})
export class ProjHome {
  @ViewChild('allTab') allTab!: ElementRef<HTMLDivElement>; 

  private proj_service = inject(ProjectServices);

  itemsToShow = signal(3);

  private projects$ = this.proj_service
    .getProjectByType()
    .pipe(map((res) => res ?? ([] as IProjects[])));

  // to transform from data from obse to signal
  _projects = toSignal(this.projects$, { initialValue: [] as IProjects[] });

  AllProjects = computed(() => this._projects().slice(0, this.itemsToShow()));
  // all data len
  AlldataLength = computed(() => this._projects().length);

  _customcode = computed(() =>
    this._projects()
      .filter((p) => p.type.toLowerCase() === 'custom code')
      .slice(0, this.itemsToShow())
  );

  // Custom len
  customCodeLength = computed(
    () => this._projects().filter((p) => p.type.toLowerCase() === 'custom code').length
  );

  // show more& less func
  loadMore() {
    this.itemsToShow.set(this.itemsToShow() + 3);

    setTimeout(() => {
      this.allTab.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
  }

  seeLess() {
    this.itemsToShow.set(3);

    setTimeout(() => {
      this.allTab.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
}
