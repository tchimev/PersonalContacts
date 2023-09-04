import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subscription, map } from 'rxjs';
import { deletePerson, getPersons } from 'src/store/Person/person.action';
import { IPerson } from 'src/store/Person/person.model';
import {
  selectPersonIsLoading,
  selectPersonsList,
} from 'src/store/Person/person.selector';

@Component({
  selector: 'app-persons-overview',
  templateUrl: './persons-overview.component.html',
  styleUrls: ['./persons-overview.component.css'],
})
export class PersonsOverviewComponent implements OnInit, OnDestroy {
  public personList: Observable<IPerson[]>;
  public isLoading: Observable<boolean>;
  public selectedPerson: IPerson;
  private _personId: number;
  private _subscription: Subscription;

  constructor(
    private readonly _messageService: MessageService,
    private readonly _confirmationService: ConfirmationService,
    private readonly _store: Store
  ) {}

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this._store.dispatch(getPersons());

    this.personList = this._store.pipe(select(selectPersonsList));
    this.isLoading = this._store.pipe(select(selectPersonIsLoading));

    this._subscription = this.isLoading.subscribe((loading) => {
      if (this._personId && !loading) {
        this.personList = this.personList.pipe(
          map((l) => l.filter((p) => p.id != this._personId))
        );
        this._messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Person Deleted',
          life: 2000,
        });
      }
    });
  }

  deleteSelectedPerson() {
    this._confirmationService.confirm({
      message:
        'Are you sure you want to delete `' +
        this.selectedPerson.surname +
        ', ' +
        this.selectedPerson.firstName +
        '`?',
      header: 'Confirm',
      accept: () => {
        this._personId = this.selectedPerson.id;
        this.selectedPerson = null;
        this._store.dispatch(deletePerson({ id: this._personId }));
      },
    });
  }
}
