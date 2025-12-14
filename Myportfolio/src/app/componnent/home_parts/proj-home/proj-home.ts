import { Component, computed, inject, OnInit } from '@angular/core';
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
  private proj_service = inject(ProjectServices);
  private projects$ = this.proj_service
    .getProjectByType()
    .pipe(map((res) => res ?? ([] as IProjects[])));
  _projects = toSignal(this.projects$, { initialValue: [] as IProjects[] });

  _customcode = computed(() =>
    this._projects().filter((p) => p.type.toLowerCase() === 'custom code')
  );
}
