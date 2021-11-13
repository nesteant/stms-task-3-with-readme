import { createAction, props } from '@ngrx/store';
import { PatientsFailedResponse, PatientsSuccessResponse } from './patients.model';

const generateActionName = (name: string) => {
  return `[PATIENTS] ${name}`
}

export const patientsClear = createAction(
  generateActionName('Clear Patients'),
  props<{ clearFavorites: boolean }>(),
);

export const patientsRehydrate = createAction(
  generateActionName('Rehydrate Patients'),
  props<{ onlyFavorites: boolean }>(),
);

export const patientsFetch = createAction(
  generateActionName('Fetch Patients'),
  props<{ term?: string, onlyFavorites: boolean }>(),
);

export const patientsFetchSuccess = createAction(
  generateActionName('Fetch Patients | SUCCESS'),
  props<PatientsSuccessResponse>(),
);

export const patientsFetchFailed = createAction(
  generateActionName('Fetch Patients | FAILED'),
  props<PatientsFailedResponse>(),
);

export const patientsToggleFavorite = createAction(
  generateActionName('Toggle Favorite'),
  props<{ id: string }>(),
);
