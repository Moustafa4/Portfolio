import { Component } from '@angular/core';
import { AboutMe } from "../home_parts/about-me/about-me";
import { ServicesPart } from "../home_parts/services-part/services-part";
import { ProjHome } from "../home_parts/proj-home/proj-home";

@Component({
  selector: 'app-home',
  imports: [AboutMe, ServicesPart, ProjHome],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
