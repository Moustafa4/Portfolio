import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProjects } from '../componnent/home_parts/proj-home/iprojects';

@Injectable({
  providedIn: 'root',
})
export class ProjectServices {
  dp_url = 'http://localhost:3000/projects';

  constructor(private _HttpClient: HttpClient) {}

  getProjectByType() {
    return this._HttpClient.get<IProjects[]>(this.dp_url);
  }
  getuserbyid(id: number) {
    return this._HttpClient.get<IProjects>(this.dp_url + '/' + id);
  }
}
