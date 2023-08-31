import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Person } from 'src/models/person';
import { PersonService } from 'src/services/person.service';

@Component({
  selector: 'app-persons-overview',
  templateUrl: './persons-overview.component.html',
  styleUrls: ['./persons-overview.component.css']
})
export class PersonsOverviewComponent implements OnInit {
  public personList: Person[];
  public selectedPerson: Person;
  
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
