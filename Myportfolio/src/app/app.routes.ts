import { Routes } from '@angular/router';
import { ProjectDetails } from './componnent/project-details/project-details';
// import { Home } from './componnent/home/home';
// import { AboutMe } from './componnent/home_parts/about-me/about-me';
// import { ServicesPart } from './componnent/home_parts/services-part/services-part';
// import { ProjHome } from './componnent/home_parts/proj-home/proj-home';

export const routes: Routes = [
//   { path: '', component: Home },
//   { path: 'AboutMe', component: AboutMe },
//   { path: '', component: ServicesPart },
  // { path: '', component: ProjHome },
  { path: 'ProjectDetails/:id', component: ProjectDetails },
];
