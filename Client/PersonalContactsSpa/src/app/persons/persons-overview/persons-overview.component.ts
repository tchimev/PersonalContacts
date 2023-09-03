import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, map } from 'rxjs';
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
  providers: [MessageService, ConfirmationService],
})
export class PersonsOverviewComponent implements OnInit {
  public personList: Observable<IPerson[]>;
  public isLoading: Observable<boolean>;
  public selectedPerson: IPerson;

  constructor(
    private readonly _messageService: MessageService,
    private readonly _confirmationService: ConfirmationService,
    private readonly _store: Store
  ) {}

  ngOnInit(): void {
    this._store.dispatch(getPersons());

    this.personList = this._store.pipe(select(selectPersonsList));
    this.isLoading = this._store.pipe(select(selectPersonIsLoading));
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
        const id = this.selectedPerson.id;
        this.selectedPerson = null;
        this._store.dispatch(deletePerson({ id: id }));
        this.isLoading.subscribe((loading) => {
          if (!loading) {
            this.personList = this.personList.pipe(
              map((l) => l.filter((p) => p.id != id))
            );
            this._messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Person Deleted',
              life: 2000,
            });
          }
        });
      },
    });
  }
}
