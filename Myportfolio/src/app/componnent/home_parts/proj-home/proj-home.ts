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

  // all data len
  AllProjects = computed(() => {
    const projects = this._projects();
    return Array.isArray(projects) ? projects.slice(0, this.itemsToShow()) : [];
  });

  AlldataLength = computed(() => this._projects().length);

  // Custom len
  _customcode = computed(() => {
    const projects = this._projects();
    return Array.isArray(projects)
      ? projects.filter((p) => p.type.toLowerCase() === 'custom code').slice(0, this.itemsToShow())
      : [];
  });
  customCodeLength = computed(() => {
    const projects = this._projects();
    return Array.isArray(projects)
      ? projects.filter((p) => p.type.toLowerCase() === 'custom code').length
      : 0;
  });
  // wordp len
  _wordpress = computed(() => {
    const projects = this._projects();
    return Array.isArray(projects)
      ? projects.filter((p) => p.type.toLowerCase() === 'wordpress').slice(0, this.itemsToShow())
      : [];
  });
  wordpressLength = computed(() => {
    const projects = this._projects();
    return Array.isArray(projects)
      ? projects.filter((p) => p.type.toLowerCase() === 'wordpress').length
      : 0;
  });
  // js len
  _js = computed(() => {
    const projects = this._projects();
    return Array.isArray(projects)
      ? projects.filter((p) => p.type.toLowerCase() === 'js').slice(0, this.itemsToShow())
      : [];
  });
  jsLength = computed(() => {
    const projects = this._projects();
    return Array.isArray(projects)
      ? projects.filter((p) => p.type.toLowerCase() === 'js').length
      : 0;
  });
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
