import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from './orders.model';

export const selectOrdersFeature = createFeatureSelector<OrdersState>('orders');

export const selectOrders = createSelector(
  selectOrdersFeature,
  (state: OrdersState) => state.order
);

export const selectFavorite = createSelector(
  selectOrdersFeature,
  (state: OrdersState) => state.favorite
);
