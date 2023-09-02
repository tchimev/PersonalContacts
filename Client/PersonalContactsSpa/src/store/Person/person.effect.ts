import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PersonService } from "./person.service";
import { map, switchMap } from "rxjs";
import { createPerson, createPersonSuccess, deletePerson, deletePersonSuccess, getPersonById, getPersonByIdSuccess, getPersons, getPersonsSuccess, updatePerson, updatePersonSuccess } from "./person.action";
import { IPerson } from "./person.model";

@Injectable()
export class PersonsEffects {
    constructor(private readonly _actions: Actions, private readonly _personService: PersonService) {
    }

    getPersons = createEffect(() =>
        this._actions.pipe(
            ofType(getPersons.type),
            switchMap(() => this._personService.getPersonList()),
            map((persons: IPerson[]) => getPersonsSuccess({ persons }))
        )
    );

    getPersonById = createEffect(() =>
        this._actions.pipe(
            ofType(getPersonById),
            switchMap(({ id }) => this._personService.getPersonById(id)),
            map((person: IPerson) => getPersonByIdSuccess({ person }))
        )
    );

    createPerson = createEffect(() =>
        this._actions.pipe(
            ofType(createPerson),
            switchMap(({ person }) => this._personService.createPerson(person)),
            map((person: IPerson) => createPersonSuccess({ person }))
        )
    );

    updatePerson = createEffect(() =>
        this._actions.pipe(
            ofType(updatePerson),
            switchMap(({ person }) => this._personService.updatePerson(person)),
            map((person: IPerson) => updatePersonSuccess({ person }))
        )
    );

    deletePerson = createEffect(() =>
        this._actions.pipe(
            ofType(deletePerson),
            switchMap(({ id }) => this._personService.deletePerson(id)),
            map((id: number) => deletePersonSuccess({ id }))
        )
    );
}