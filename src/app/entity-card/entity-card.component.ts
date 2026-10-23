import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../data/categories';
import { EldenEntity } from '../models/elden.model';
import { placeholderFor } from '../utils/placeholder';

@Component({
  selector: 'app-entity-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './entity-card.component.html',
})
export class EntityCardComponent {
  @Input({ required: true }) entity!: EldenEntity;
  @Input({ required: true }) category!: Category;

  get placeholder(): string {
    return placeholderFor(this.category.icon);
  }

  /** Primer dato útil para mostrar bajo el nombre */
  get subtitle(): string {
    for (const key of ['category', 'type', 'region', 'location', 'role', 'affinity']) {
      const v = this.entity[key];
      if (typeof v === 'string' && v) return v;
    }
    return '';
  }
}
