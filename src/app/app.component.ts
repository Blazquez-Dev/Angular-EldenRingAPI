import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CATEGORIES } from './data/categories';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly categories = CATEGORIES;

  /** Ascuas decorativas con posición, tamaño y velocidad aleatorios */
  readonly embers = Array.from({ length: 30 }, () => ({
    left: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 8 + Math.random() * 10,
    delay: -Math.random() * 15,
  }));
}
