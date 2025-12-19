import { Component, signal } from '@angular/core';
import { Header } from './componnent/header/header';
import { RouterModule } from "@angular/router";
import { AboutMe } from "./componnent/home_parts/about-me/about-me";
import { ProjHome } from "./componnent/home_parts/proj-home/proj-home";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RouterModule,],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('portfolio');
}
