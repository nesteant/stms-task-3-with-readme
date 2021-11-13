import { Action, createReducer, on } from '@ngrx/store';
import { Order } from '../../../shared/models/order.model';
import { ordersClear, ordersFetch, ordersFetchFailed, ordersFetchSuccess, ordersRehydrate, ordersToggleFavorite } from './orders.actions';
import { OrdersState } from './orders.model';

export const initialState: OrdersState = {
  order: [],
  favorite: []
};

const rehydrateOrders = (orders: Order[], favorite: string[], showOnlyFavorites = false) => {
  const orderList = orders.map(o => ({...o, isFavorite: favorite.includes(o.identifier)}));
  return showOnlyFavorites ? orderList.filter(o => o.isFavorite) : orderList;
}

const reducer = createReducer(
  initialState,
  on(
    ordersFetch,
    (state, action) => {
      return {...state, ...action};
    }
  ),
  on(
    ordersToggleFavorite,
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

      newState.order = [...state.order];
      const index = newState.order.findIndex(v => v.identifier === action.id);
      newState.order[index] = {
        ...newState.order[index],
        isFavorite
      }
      return {
        ...newState,
        favorite: Array.from(fav),
      };
    }
  ),
  on(
    ordersFetchFailed,
    /**
     * no update on error
     */
    (state) => state),
  on(
    ordersRehydrate,
    (state, action) => {
      return {...state, order: rehydrateOrders(state.order, state.favorite, action.onlyFavorites)};
    }
  ),
  on(
    ordersClear,
    (state, action) => {
      return action.clearFavorites ? {...initialState} : {...initialState, favorite: [...state.favorite]};
    }
  ),
  on(
    ordersFetchSuccess,
    (state, action) => {
      return {
        ...state,
        ...action,
        order: rehydrateOrders(action.order, state.favorite, action.showOnlyFavorites)
      }
    }
  ),
);

export function ordersReducer(
  state: OrdersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
