import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProjects } from '../componnent/home_parts/proj-home/iprojects';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectServices {
  dp_url =
    'https://raw.githubusercontent.com/Moustafa4/Portfolio/refs/heads/main/Myportfolio/public/data/data.json';

  constructor(private _HttpClient: HttpClient) {}

  getProjectByType() {
    return this._HttpClient
      .get<{ projects: IProjects[] }>(this.dp_url)
      .pipe(map((res) => res.projects ?? []));
  }
  getProjectById(id: number): Observable<IProjects | null> {
    return this._HttpClient
      .get<IProjects[]>(this.dp_url)
      .pipe(map((projects) => projects.find((p) => p.id === id) || null));
  }
}
