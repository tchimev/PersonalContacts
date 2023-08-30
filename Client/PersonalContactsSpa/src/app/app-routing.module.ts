import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsOverviewComponent } from './persons/persons-overview/persons-overview.component';
import { PersonAddEditComponent } from './persons/person-add-edit/person-add-edit.component';

const routes: Routes = [
  { path: 'person/:id', component: PersonAddEditComponent },
  { path: 'person', component: PersonAddEditComponent },
  { path: 'persons', component: PersonsOverviewComponent },
  { path: '', redirectTo: 'persons', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
