import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { patientsFetch, patientsFetchFailed, patientsFetchSuccess } from './patients.actions';
import { PatientsSuccessResponse } from './patients.model';

@Injectable()
export class PatientsEffects {

  fetchPatients = createEffect(
    () => this.actions$.pipe(
      ofType(
        patientsFetch,
      ),
      switchMap(patientRequest => {
        if (patientRequest.onlyFavorites) {
          //TODO pass filtering to backend if supported. will do in reducer for now
        }

        return this.httpClient.get('https://api.mocki.io/v2/51597ef3')
          .pipe(
            map((result: PatientsSuccessResponse) => patientsFetchSuccess({
              ...result,
              showOnlyFavorites: patientRequest.onlyFavorites
            })),
            catchError((err) => of(patientsFetchFailed(err)))
          )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
  ) {
  }
}
