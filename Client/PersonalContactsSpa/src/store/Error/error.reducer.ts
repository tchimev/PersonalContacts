import { createReducer, on } from '@ngrx/store';
import { addGlobalError, removeGlobalError } from './error.action';

const reducer = createReducer(
  { error: null },
  on(addGlobalError, (state, { error }) => {
    return {
      error,
    };
  }),
  on(removeGlobalError, (state) => {
    return {
      error: null
    };
  })
);

export function globalErrorReducer(state: any = null, actions) {
  return reducer(state, actions);
}
