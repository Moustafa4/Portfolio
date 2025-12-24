import { Routes } from '@angular/router';
import { ProjectDetails } from './componnent/project-details/project-details';
import { Home } from './componnent/home/home';
import { AboutMe } from './componnent/home_parts/about-me/about-me';
import { ProjHome } from './componnent/home_parts/proj-home/proj-home';
import { ServicesPart } from './componnent/home_parts/services-part/services-part';

export const routes: Routes = [ 
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: Home },
  { path: 'AboutMe', component: AboutMe },
  { path: 'Services', component: ServicesPart },
  { path: 'project', component: ProjHome },
  { path: 'ProjectDetails/:id', component: ProjectDetails },
];
