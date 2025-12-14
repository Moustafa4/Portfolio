import { Component, inject, OnInit } from '@angular/core';
import { ProjectServices } from '../../Services/project-services';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { IProjects } from '../home_parts/proj-home/iprojects';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ProjectServices],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
})
export class ProjectDetails {
  id = 0;
  private route = inject(ActivatedRoute);
  private proService = inject(ProjectServices);

  private project$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) => this.proService.getuserbyid(id)) // يرجع IProjects واحد
  );

  project = toSignal<IProjects | null>(this.project$, { initialValue: null });
}
