import { ProductEntity } from '@/state/ducks/product/types';
import { EntityId } from '@/state/interface';
import { FilterTypeInterface } from '@/utils';
import { FormInstance } from 'antd';

export type Breakpoints = {
  lg: number;
  md: number;
};

export interface ListBaseInterface {
  products: ProductEntity[];
  userId: EntityId | null;
  loading: boolean;
  breakpoints: Breakpoints;
  breakpointIndex: number;
}

export interface FavouriteListInterface extends ListBaseInterface {
  fetchFavourites: (userID: EntityId) => void;
}

export interface ProductListInterface extends ListBaseInterface {
  isAdmin: boolean;
  isLoggedIn: boolean;
  visible: boolean;
  fetchProducts: () => void;
  deleteProduct: (product: ProductEntity) => void;
  handleCreate: (values: any) => void;
  openModal: () => void;
  closeModal: () => void;
}

export interface ProductFilterInterface {
  form: FormInstance<any>;
  filterTypes: FilterTypeInterface<ProductEntity>;
  onSearchFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (changedFields: Array<any>) => void;
  onFilterReset: () => void;
}
