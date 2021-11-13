import { Order } from '../../../shared/models/order.model';

export interface OrdersState {
  order: (Order & { isFavorite?: boolean })[];
  favorite: string[];
  count?: number;
  undisplayedMatches?: boolean;
  moreUncountedMatches?: boolean;
}

export interface OrdersSuccessResponse {
  count: number;
  order: Order[];
  undisplayedMatches: boolean;
  moreUncountedMatches: boolean;
  showOnlyFavorites: boolean;
}

export interface OrdersFailedResponse {
  message: string;
}
