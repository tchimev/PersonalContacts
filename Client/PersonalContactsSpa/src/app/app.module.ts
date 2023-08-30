import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonsOverviewComponent } from './persons/persons-overview/persons-overview.component';
import { PersonAddEditComponent } from './persons/person-add-edit/person-add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonsOverviewComponent,
    PersonAddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
