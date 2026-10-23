import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EntityListComponent } from './entity-list/entity-list.component';
import { EntityDetailComponent } from './entity-detail/entity-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':category', component: EntityListComponent },
  { path: ':category/:id', component: EntityDetailComponent },
  { path: '**', redirectTo: '' },
];
