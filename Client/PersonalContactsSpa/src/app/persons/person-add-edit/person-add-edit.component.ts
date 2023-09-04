import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { removeGlobalError } from 'src/store/error/error.action';
import { selectGlobalError } from 'src/store/error/error.selector';
import { createPerson, updatePerson } from 'src/store/person/person.action';
import {
  selectPersonById,
  selectPersonIsLoading,
} from 'src/store/person/person.selector';

@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.css'],
})
export class PersonAddEditComponent implements OnInit, OnDestroy {
  public form = this._fb.group({
    firstName: ['', Validators.required],
    surname: ['', Validators.required],
    birthDate: [new Date('1950-01-01'), Validators.required],
    phoneNumber: ['', Validators.required],
    iban: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    zipCode: [''],
  });
  public isEdit = false;
  private _personId: number = 0;
  private _isSubmitted = false;
  private _hasError = false;
  private _errorSubscription: Subscription;
  private _loadingSubscription: Subscription;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _store: Store,
    private readonly _messageService: MessageService,
    private readonly _ngZone: NgZone
  ) {}

  ngOnDestroy(): void {
    this._errorSubscription.unsubscribe();
    this._loadingSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this._store.dispatch(removeGlobalError());

    this._loadingSubscription = this._store.pipe(select(selectPersonIsLoading)).subscribe((loading) => {
      if (this._isSubmitted && !loading && !this._hasError) {
        this.form.disable();
        this._messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Person Saved',
          life: 2000,
        });
      }
    });

    this._errorSubscription = this._store.pipe(select(selectGlobalError)).subscribe((e: any) => {
      if (e?.error) {
        this._hasError = true;
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error saving Person! See log for details.',
          life: 3000,
        });
      }
    });

    this._route.params.subscribe((params) => {
      this._personId = params.id;
      this.isEdit = this._personId > 0;
      if (this._personId) {
        this._store
          .select(selectPersonById(this._personId))
          .subscribe((person) => {
            this.form.patchValue(person);
            this.form.patchValue({
              birthDate: new Date(person.birthDate.toString() + 'Z'),
            });
          });
      }
    });
  }

  public submit(): void {
    this._hasError = false;
    this._isSubmitted = true;

    const person = {
      id: this._personId,
      firstName: this.form.value['firstName'],
      surname: this.form.value['surname'],
      birthDate: this.form.value['birthDate'],
      phoneNumber: this.form.value['phoneNumber'],
      iban: this.form.value['iban'],
      country: this.form.value['country'],
      city: this.form.value['city'],
      street: this.form.value['street'],
      zipCode: this.form.value['zipCode'],
    };

    if (this._personId) {
      this._store.dispatch(updatePerson({ person: person }));
    } else {
      this._store.dispatch(createPerson({ person: person }));
    }
  }

  public onCloseMessage(): void {
    if (!this._hasError) {
     this._ngZone.run(() => this._router.navigate(['/']));
    }
  }
}
