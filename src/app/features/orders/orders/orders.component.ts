import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

@Component({
  selector: 'st-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor() {
  }
}
