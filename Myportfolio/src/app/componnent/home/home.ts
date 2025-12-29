import { Component } from '@angular/core';
import { AboutMe } from "../home_parts/about-me/about-me";
import { ServicesPart } from "../home_parts/services-part/services-part";
import { ProjHome } from "../home_parts/proj-home/proj-home";
import { Contact } from "../contact/contact";

@Component({
  selector: 'app-home',
  imports: [AboutMe, ServicesPart, ProjHome, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
