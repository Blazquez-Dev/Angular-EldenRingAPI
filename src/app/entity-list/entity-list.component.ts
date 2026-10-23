import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, EMPTY, Observable, catchError, debounceTime, map, of, startWith, switchMap } from 'rxjs';
import { CATEGORY_MAP, Category } from '../data/categories';
import { EldenEntity } from '../models/elden.model';
import { EldenRingService } from '../services/eldenring.service';
import { EntityCardComponent } from '../entity-card/entity-card.component';

interface ListVm {
  cat: Category;
  loading: boolean;
  error: boolean;
  items: EldenEntity[];
  page: number;
  hasNext: boolean;
  pages: number | null;
}

@Component({
  selector: 'app-entity-list',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, EntityCardComponent],
  templateUrl: './entity-list.component.html',
})
export class EntityListComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(EldenRingService);

  readonly pageSize = 24;
  readonly search = new FormControl('', { nonNullable: true });
  private query$ = new BehaviorSubject<{ page: number; name: string }>({ page: 0, name: '' });

  vm$: Observable<ListVm> = this.route.paramMap.pipe(
    map((p) => CATEGORY_MAP[p.get('category') ?? '']),
    switchMap((cat) => {
      if (!cat) {
        this.router.navigate(['/']);
        return EMPTY;
      }
      // Al cambiar de categoría se reinicia búsqueda y página
      this.search.setValue('', { emitEvent: false });
      this.query$.next({ page: 0, name: '' });
      return this.query$.pipe(switchMap((q) => this.load(cat, q)));
    })
  );

  constructor() {
    this.search.valueChanges
      .pipe(debounceTime(400), takeUntilDestroyed())
      .subscribe((name) => this.query$.next({ page: 0, name: name.trim() }));
  }

  private load(cat: Category, q: { page: number; name: string }): Observable<ListVm> {
    const base = { cat, page: q.page, items: [] as EldenEntity[], hasNext: false, pages: null as number | null };
    return this.service.getList(cat.key, q.page, this.pageSize, q.name).pipe(
      map((res) => ({
        ...base,
        loading: false,
        error: false,
        items: res.data ?? [],
        hasNext: (res.data?.length ?? 0) === this.pageSize,
        pages: res.total ? Math.ceil(res.total / this.pageSize) : null,
      })),
      startWith({ ...base, loading: true, error: false }),
      catchError(() => of({ ...base, loading: false, error: true }))
    );
  }

  go(page: number) {
    this.query$.next({ ...this.query$.value, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  retry() {
    this.query$.next({ ...this.query$.value });
  }
}
