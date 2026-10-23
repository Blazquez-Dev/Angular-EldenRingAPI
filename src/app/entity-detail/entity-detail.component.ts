import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EMPTY, Observable, catchError, map, of, startWith, switchMap } from 'rxjs';
import { CATEGORY_MAP, Category } from '../data/categories';
import { EldenEntity } from '../models/elden.model';
import { EldenRingService } from '../services/eldenring.service';
import { Field, buildFields } from '../utils/fields';
import { placeholderFor } from '../utils/placeholder';

interface DetailVm {
  state: 'loading' | 'ok' | 'error';
  cat: Category;
  entity: EldenEntity | null;
  facts: Field[];   // datos cortos (peso, categoría…)
  blocks: Field[];  // listas, estadísticas y textos largos
}

@Component({
  selector: 'app-entity-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './entity-detail.component.html',
})
export class EntityDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(EldenRingService);

  placeholder = placeholderFor;

  vm$: Observable<DetailVm> = this.route.paramMap.pipe(
    switchMap((p) => {
      const cat = CATEGORY_MAP[p.get('category') ?? ''];
      const id = p.get('id') ?? '';
      if (!cat) {
        this.router.navigate(['/']);
        return EMPTY;
      }
      const empty = { cat, entity: null, facts: [] as Field[], blocks: [] as Field[] };
      return this.service.getById(cat.key, id).pipe(
        map((res): DetailVm => {
          const entity = Array.isArray(res.data) ? res.data[0] : res.data;
          if (!entity) return { ...empty, state: 'error' };
          const fields = buildFields(entity);
          const isFact = (f: Field) => f.kind === 'text' && (f.text?.length ?? 0) <= 40;
          return { state: 'ok', cat, entity, facts: fields.filter(isFact), blocks: fields.filter((f) => !isFact(f)) };
        }),
        startWith<DetailVm>({ ...empty, state: 'loading' }),
        catchError(() => of<DetailVm>({ ...empty, state: 'error' }))
      );
    })
  );
}
