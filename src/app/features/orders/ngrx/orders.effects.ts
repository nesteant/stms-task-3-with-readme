import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ordersFetch, ordersFetchFailed, ordersFetchSuccess } from './orders.actions';
import { OrdersSuccessResponse } from './orders.model';

@Injectable()
export class OrdersEffects {

  fetchOrders = createEffect(
    () => this.actions$.pipe(
      ofType(
        ordersFetch,
      ),
      switchMap(orderRequest => {
        if (orderRequest.onlyFavorites) {
          //TODO pass filtering to backend if supported. will do in reducer for now
        }

        console.log('ORDER REQ', orderRequest);
        return this.httpClient.get('https://api.mocki.io/v2/79fb05cb')
          .pipe(
            map((result: OrdersSuccessResponse) => ordersFetchSuccess({
              ...result,
              showOnlyFavorites: orderRequest.onlyFavorites
            })),
            catchError((err) => of(ordersFetchFailed(err)))
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
