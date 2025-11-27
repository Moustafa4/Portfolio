import { Component, signal } from '@angular/core';
import { Home } from './componnent/home/home';
import { Header } from './componnent/header/header';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [Home, Header, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
}
