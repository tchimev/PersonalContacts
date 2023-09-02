import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, lastValueFrom } from 'rxjs';
import { getPersons } from 'src/store/Person/person.action';
import { IPerson } from 'src/store/Person/person.model';
import { selectPersonIsLoading, selectPersonsList } from 'src/store/Person/person.selector';

@Component({
  selector: 'app-persons-overview',
  templateUrl: './persons-overview.component.html',
  styleUrls: ['./persons-overview.component.css']
})
export class PersonsOverviewComponent implements OnInit {
  public personList: Observable<IPerson[]>;
  public isLoading: Observable<boolean>;
  public selectedPerson: IPerson;
  
  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getPersons());

    this.personList = this.store.pipe(select(selectPersonsList));
    this.isLoading = this.store.pipe(select(selectPersonIsLoading));
  }
}
