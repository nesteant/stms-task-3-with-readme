import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatestWith, Observable, of, switchMap } from 'rxjs';
import { Order } from '../../../shared/models/order.model';
import { ordersFetch, ordersRehydrate, OrdersState, ordersToggleFavorite, selectOrders } from '../ngrx';
import { defaultColumns } from './order.constants';

export abstract class OrdersTableComponent {
  columns = defaultColumns;
  search$ = new BehaviorSubject<string>(null);
  //TODO: pagination would be great but I do not want to spend time on it
  orders$: Observable<Order[]> = this.search$
    .pipe(
      //TODO: would be nice if model returns already merged results from reducer but I will save time with naive approach
      //TODO: also would be nice to move this to effects and do just ngrx
      combineLatestWith(this.store.select(selectOrders)),
      switchMap(([search, orders]) => {
        const ordersThatMatchSearch = search ? orders
          .filter(order => {
            return this.columns.some(c => {
              const value = c.dataAccessor ? c.dataAccessor(order[c.name]) : order[c.name];
              return value?.toLowerCase().indexOf(search?.toLowerCase()) > -1
            });
          }) : orders;

        return of(ordersThatMatchSearch);
      })
    );

  constructor(protected onlyFavorites: boolean, protected store: Store<OrdersState>) {
  }

  fetchOrders() {
    this.store.dispatch(ordersFetch({onlyFavorites: this.onlyFavorites}));
  }

  onSearch(term: string) {
    this.search$.next(term);
    this.store.dispatch(ordersFetch({
      term,
      onlyFavorites: false
    }))
  }

  onToggleFavorite(id: string) {
    this.store.dispatch(ordersToggleFavorite({id}));
    this.store.dispatch(ordersRehydrate({onlyFavorites: this.onlyFavorites}));
  }
}
