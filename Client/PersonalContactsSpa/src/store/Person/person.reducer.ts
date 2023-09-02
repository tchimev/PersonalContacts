import { createReducer, on } from "@ngrx/store";
import { IPersonState } from "./person.model";
import { createPerson, createPersonSuccess, deletePerson, deletePersonSuccess, getPersonById, getPersonByIdSuccess, getPersons, getPersonsSuccess, updatePerson, updatePersonSuccess } from "./person.action";

export const initialPersonsState: IPersonState = {
    persons: [],
    isLoading: false
};

const reducer = createReducer<IPersonState>(
    initialPersonsState,
    on(getPersons, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(getPersonsSuccess, (state, { persons }) => {
        return {
            ...state,
            isLoading: false,
            persons
        };
    }),
    on(getPersonById, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(getPersonByIdSuccess, (state, { person }) => {
        return {
            ...state,
            persons: [person],
            isLoading: false,
        };
    }),
    on(createPerson, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(createPersonSuccess, (state, { person }) => {
        return {
            ...state,
            persons: [...state.persons, person],
            isLoading: false,
        };
    }),
    on(updatePerson, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(updatePersonSuccess, (state, { person }) => {
        return {
            ...state,
            persons: state.persons.map((b) => b.id === person.id ? person : b),
            isLoading: false,
        };
    }),
    on(deletePerson, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(deletePersonSuccess, (state, { id }) => {
        return {
            ...state,
            isLoading: false,
            persons: state.persons.filter((b) => b.id !== id)
        };
    })
);

export function personsReducer(state = initialPersonsState, actions): IPersonState {
    return reducer(state, actions);
}