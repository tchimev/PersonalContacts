import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IPersonState } from "./person.model";

export const selectPersonState = createFeatureSelector<IPersonState>('person');
export const selectPersonsList = createSelector(selectPersonState, (state) => state.persons);
export const selectPersonById = (id: number) => 
    createSelector(selectPersonState, (state) => state.persons[id]);
export const selectPersonIsLoading = createSelector(selectPersonState, (state) => state.isLoading);