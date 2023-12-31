import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonsOverviewComponent } from './persons/persons-overview/persons-overview.component';
import { PersonAddEditComponent } from './persons/person-add-edit/person-add-edit.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PersonStoreModule } from 'src/store/person/person.module';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorInterceptor } from 'src/shared/error.interceptor';
import { globalErrorReducer } from 'src/store/error/error.reducer';

@NgModule({
  declarations: [
    AppComponent,
    PersonsOverviewComponent,
    PersonAddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    TableModule,
    ButtonModule,
    StoreModule.forRoot({ error: globalErrorReducer }),
    EffectsModule.forRoot(),
    PersonStoreModule,
    CalendarModule,
    InputTextModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    MessageService, 
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
