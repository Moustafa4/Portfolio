import { Component, signal } from '@angular/core';
import { Home } from './componnent/home/home';
import { Header } from './componnent/header/header';
import { RouterModule } from "@angular/router";
import { ServicesPart } from "./componnent/services-part/services-part";

@Component({
  selector: 'app-root',
  imports: [Home, Header, RouterModule, ServicesPart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
}
