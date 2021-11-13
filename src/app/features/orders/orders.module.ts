import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';
import { OrdersEffects, ordersReducer } from './ngrx';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersAllComponent } from './orders/orders-all/orders-all.component';
import { OrdersFavoritesComponent } from './orders/orders-favorites/orders-favorites.component';

import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [OrdersComponent, OrdersAllComponent, OrdersFavoritesComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule,
    StoreModule.forFeature('orders', ordersReducer),
    EffectsModule.forFeature([OrdersEffects])
  ]
})
export class OrdersModule {
}
