import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ordersClear, OrdersState } from '../../ngrx';
import { OrdersTableComponent } from '../orders-table.component';

@Component({
  selector: 'st-orders-all',
  templateUrl: './orders-all.component.html',
  styleUrls: ['./orders-all.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersAllComponent extends OrdersTableComponent implements OnInit {
  constructor(protected store: Store<OrdersState>) {
    super(false, store);
  }

  ngOnInit(): void {
    this.store.dispatch(ordersClear({clearFavorites: false}));
  }

}
