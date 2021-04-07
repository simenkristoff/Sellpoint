import { action } from 'typesafe-actions';
import { CategoryActionTypes, CategoryEntity } from './types';

export const fetchCategories = () => {
  return action(CategoryActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'product/categories/',
  });
};

export const createCategory = (data: CategoryEntity) => {
  return action(CategoryActionTypes.CREATE.START, data, {
    method: 'post',
    route: 'product/categories/',
  });
};

export const deleteCategory = (data: CategoryEntity) =>
  action(CategoryActionTypes.DELETE.START, data, {
    method: 'delete',
    route: `product/categories/${data.id}/`,
  });
