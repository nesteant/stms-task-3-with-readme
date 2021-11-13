import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersAllComponent } from './orders/orders-all/orders-all.component';
import { OrdersFavoritesComponent } from './orders/orders-favorites/orders-favorites.component';

import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    data: {
      title: 'stms.menu.orders'
    },
    children: [
      {
        path: '',
        component: OrdersAllComponent,

      },
      {
        path: 'favorites',
        component: OrdersFavoritesComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
