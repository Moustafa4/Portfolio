import { Component, signal } from '@angular/core';
import { Header } from './componnent/header/header';
import { RouterModule } from "@angular/router";
import { Footer } from "./componnent/footer/footer";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RouterModule, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('portfolio');
}
