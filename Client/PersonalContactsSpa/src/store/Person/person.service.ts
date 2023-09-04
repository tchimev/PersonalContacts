import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IPerson } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
    private readonly _APIUrl = "https://localhost:7065/api/persons";
    
    constructor(private http: HttpClient) {}

    public getPersonList(): Observable<IPerson[]> {
        return this.http.get<IPerson[]>(this._APIUrl);
    }

    public getPersonById(id: number): Observable<IPerson> {
        return this.http.get<IPerson>(this._APIUrl + '/' + id);
    }

    public createPerson(person: IPerson): Observable<IPerson> {
        return this.http.post<IPerson>(this._APIUrl, person);
    }

    public updatePerson(person: IPerson): Observable<IPerson> {
        return this.http.put<IPerson>(this._APIUrl, person);
    }

    public deletePerson(id: number): Observable<any> {
        return this.http.delete(this._APIUrl + '/' + id);
    }
}