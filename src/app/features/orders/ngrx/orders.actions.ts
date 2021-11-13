import { createAction, props } from '@ngrx/store';
import { OrdersFailedResponse, OrdersSuccessResponse } from './orders.model';

const generateActionName = (name: string) => {
  return `[ORDERS] ${name}`
}

export const ordersClear = createAction(
  generateActionName('Clear Orders'),
  props<{ clearFavorites: boolean }>(),
);

export const ordersRehydrate = createAction(
  generateActionName('Rehydrate Orders'),
  props<{ onlyFavorites: boolean }>(),
);

export const ordersFetch = createAction(
  generateActionName('Fetch Orders'),
  props<{ term?: string, onlyFavorites: boolean }>(),
);

export const ordersFetchSuccess = createAction(
  generateActionName('Fetch Orders | SUCCESS'),
  props<OrdersSuccessResponse>(),
);

export const ordersFetchFailed = createAction(
  generateActionName('Fetch Orders | FAILED'),
  props<OrdersFailedResponse>(),
);

export const ordersToggleFavorite = createAction(
  generateActionName('Toggle Favorite'),
  props<{ id: string }>(),
);
