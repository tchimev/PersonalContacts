import { createAction, props } from "@ngrx/store";
import { IPerson } from "./person.model";

const prefix = '[Persons]';

export const getPersons = createAction(`${prefix} Get Persons`);
export const getPersonsSuccess = createAction(
    `${getPersons.type} Success`,
    props<{
        persons: IPerson[];
    }>()
);

export const getPersonById = createAction(
    `${prefix} Get Person by id`,
    props<{
        id: number
    }>()
);
export const getPersonByIdSuccess = createAction(
    `${getPersonById.type} Success`,
    props<{
        person: IPerson;
    }>()
);

export const createPerson = createAction(
    `${prefix} Create Person`,
    props<{
        person: IPerson;
    }>()
);
export const createPersonSuccess = createAction(
    `${createPerson.type} Success`,
    props<{
        person: IPerson;
    }>()
);

export const updatePerson = createAction(
    `${prefix} Update Person`,
    props<{
        person: IPerson;
    }>()
);
export const updatePersonSuccess = createAction(
    `${updatePerson.type} Success`,
    props<{
        person: IPerson;
    }>()
);

export const deletePerson = createAction(
    `${prefix} Delete Person`,
    props<{
        id: number;
    }>()
);
export const deletePersonSuccess = createAction(
    `${deletePerson.type} Success`,
    props<{
        id: number
    }>()
);