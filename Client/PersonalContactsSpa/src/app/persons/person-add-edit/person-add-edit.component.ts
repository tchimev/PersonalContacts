import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPerson } from 'src/store/Person/person.model';

@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.css']
})
export class PersonAddEditComponent implements OnInit{

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
