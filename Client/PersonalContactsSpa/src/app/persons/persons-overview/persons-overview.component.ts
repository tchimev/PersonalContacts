import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IPerson } from 'src/store/Person/person.model';
import { PersonService } from 'src/store/Person/person.service';

@Component({
  selector: 'app-persons-overview',
  templateUrl: './persons-overview.component.html',
  styleUrls: ['./persons-overview.component.css']
})
export class PersonsOverviewComponent implements OnInit {
  public personList: IPerson[];
  public selectedPerson: IPerson;
  
  constructor(private _personService: PersonService) { }

  ngOnInit(): void {
    this.fetchPersons();
  }

  private fetchPersons() {
    lastValueFrom(this._personService.getPersonList()).then((persons) => {
      this.personList = persons;
    });
  }
}
