import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Person } from 'src/models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
    private readonly _APIUrl = "https://localhost:7065/api/persons";
    
    constructor(private http: HttpClient) {}

    public getPersonList(): Observable<Person[]> {
        return this.http.get<Person[]>(this._APIUrl);
    }

    public getPersonById(id: number): Observable<Person> {
        return this.http.get<Person>(this._APIUrl + '/' + id);
    }

    public createPerson(person: Person): Observable<Person> {
        return this.http.post<Person>(this._APIUrl, person);
    }

    public updatePerson(person: Person): Observable<Person> {
        return this.http.put<Person>(this._APIUrl, person);
    }

    public deletePerson(id: number): Observable<any> {
        return this.http.delete(this._APIUrl + '/' + id);
    }
}