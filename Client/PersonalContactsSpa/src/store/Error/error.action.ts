import { createAction, props } from "@ngrx/store";

const prefix = '[Global error]';

export const addGlobalError = createAction(
    `${prefix} Add error`,
    props<{
        error: any
    }>()
);

export const removeGlobalError = createAction(`${prefix} Remove error`);