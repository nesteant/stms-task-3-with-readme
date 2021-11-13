import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ordersFetch, OrdersState } from '../../ngrx';
import { OrdersTableComponent } from '../orders-table.component';

@Component({
  selector: 'st-orders-favorties',
  templateUrl: './orders-favorites.component.html',
  styleUrls: ['./orders-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersFavoritesComponent extends OrdersTableComponent implements OnInit {
  constructor(protected store: Store<OrdersState>) {
    super(true, store);
  }

  ngOnInit(): void {
    this.store.dispatch(ordersFetch({
      onlyFavorites: true
    }));
  }

}
