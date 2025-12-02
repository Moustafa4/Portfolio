import { Component, signal } from '@angular/core';
import { Home } from './componnent/home/home';
import { Header } from './componnent/header/header';
import { RouterModule } from "@angular/router";
import { ServicesPart } from './componnent/home_parts/services-part/services-part';
import { AboutMe } from "./componnent/home_parts/about-me/about-me";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home, Header, RouterModule, ServicesPart, AboutMe],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('portfolio');
}
