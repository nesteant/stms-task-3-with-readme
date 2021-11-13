import { Action, createReducer, on } from '@ngrx/store';
import { Patient } from '../../../shared/models/patient.model';
import { patientsClear, patientsFetch, patientsFetchFailed, patientsFetchSuccess, patientsRehydrate, patientsToggleFavorite } from './patients.actions';
import { PatientsState } from './patients.model';

export const initialState: PatientsState = {
  patient: [],
  favorite: []
};

const rehydratePatients = (patients: Patient[], favorite: string[], showOnlyFavorites = false) => {
  const patientList = patients.map(o => ({...o, isFavorite: favorite.includes(o.defaultId)}));
  return showOnlyFavorites ? patientList.filter(o => o.isFavorite) : patientList;
}

const reducer = createReducer(
  initialState,
  on(
    patientsFetch,
    (state, action) => {
      return {...state, ...action};
    }
  ),
  on(
    patientsToggleFavorite,
    (state, action) => {
      const newState = {...state};

      //TODO: someday people will complain about non optimal solution :)
      const fav = new Set<string>(state.favorite);
      let isFavorite: boolean;
      if (fav.has(action.id)) {
        fav.delete(action.id);
        isFavorite = false;
      } else {
        fav.add(action.id);
        isFavorite = true;
      }

      newState.patient = [...state.patient];
      const index = newState.patient.findIndex(v => v.defaultId === action.id);
      newState.patient[index] = {
        ...newState.patient[index],
        isFavorite
      }
      return {
        ...newState,
        favorite: Array.from(fav),
      };
    }
  ),
  on(
    patientsFetchFailed,
    /**
     * no update on error
     */
    (state) => state),
  on(
    patientsRehydrate,
    (state, action) => {
      return {...state, patient: rehydratePatients(state.patient, state.favorite, action.onlyFavorites)};
    }
  ),
  on(
    patientsClear,
    (state, action) => {
      return action.clearFavorites ? {...initialState} : {...initialState, favorite: [...state.favorite]};
    }
  ),
  on(
    patientsFetchSuccess,
    (state, action) => {
      return {
        ...state,
        ...action,
        patient: rehydratePatients(action.patient, state.favorite, action.showOnlyFavorites)
      }
    }
  ),
);

export function patientsReducer(
  state: PatientsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
