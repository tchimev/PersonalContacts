import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectErrorState = createFeatureSelector('error');
export const selectGlobalError = createSelector(selectErrorState, (state) => state);