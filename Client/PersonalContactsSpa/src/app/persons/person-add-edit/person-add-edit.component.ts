import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { createPerson, updatePerson } from 'src/store/Person/person.action';
import {
  selectPersonById,
  selectPersonIsLoading,
} from 'src/store/Person/person.selector';

@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.css'],
  providers: [MessageService],
})
export class PersonAddEditComponent implements OnInit {
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

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _store: Store,
    private readonly _messageService: MessageService,
    private readonly _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this._personId = params.id;
      this.isEdit = this._personId > 0;
      if (this._personId) {
        this._store
          .select(selectPersonById(this._personId))
          .subscribe((person) => {
            this.form.patchValue(person);
            this.form.patchValue({ birthDate: new Date(person.birthDate.toString() + 'Z') });
          });
      }
    });
  }

  public submit(): void {
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

    this._store.pipe(select(selectPersonIsLoading)).subscribe((loading) => {
      if (!loading) {
        this.form.disable();
        this._messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Person Saved',
          life: 2000,
        });
      }
    });
  }

  public onCloseMessage(): void {
     this._ngZone.run(() => this._router.navigate(['/']));
  }
}
