import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientsState } from './patients.model';

export const selectPatientsFeature = createFeatureSelector<PatientsState>('patients');

export const selectPatients = createSelector(
  selectPatientsFeature,
  (state: PatientsState) => state.patient
);

export const selectFavorite = createSelector(
  selectPatientsFeature,
  (state: PatientsState) => state.favorite
);
