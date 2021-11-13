import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatestWith, Observable, of, switchMap } from 'rxjs';
import { Patient } from '../../../shared/models/patient.model';
import { patientsFetch, patientsRehydrate, PatientsState, patientsToggleFavorite, selectPatients } from '../ngrx';
import { defaultColumns } from './patients.constants';

export abstract class PatientsTableComponent {
  columns = defaultColumns;
  search$ = new BehaviorSubject<string>(null);
  //TODO: pagination would be great but I do not want to spend time on it
  patients$: Observable<Patient[]> = this.search$
    .pipe(
      //TODO: would be nice if model returns already merged results from reducer but I will save time with naive approach
      //TODO: also would be nice to move this to effects and do just ngrx
      combineLatestWith(this.store.select(selectPatients)),
      switchMap(([search, patients]) => {
        const patientsThatMatchSearch = search ? patients
          .filter(patient => {
            return this.columns.some(c => {
              const value = c.dataAccessor ? c.dataAccessor(patient[c.name]) : patient[c.name];
              return value?.toLowerCase().indexOf(search?.toLowerCase()) > -1
            });
          }) : patients;

        return of(patientsThatMatchSearch);
      })
    );

  constructor(protected onlyFavorites: boolean, protected store: Store<PatientsState>) {
  }

  fetchPatients() {
    this.store.dispatch(patientsFetch({onlyFavorites: this.onlyFavorites}));
  }

  onSearch(term: string) {
    this.search$.next(term);
    this.store.dispatch(patientsFetch({
      term,
      onlyFavorites: false
    }))
  }

  onToggleFavorite(id: string) {
    this.store.dispatch(patientsToggleFavorite({id}));
    this.store.dispatch(patientsRehydrate({onlyFavorites: this.onlyFavorites}));
  }
}
