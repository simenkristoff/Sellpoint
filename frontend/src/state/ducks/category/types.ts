import { BaseState, Entity, TMetaAction, TPayloadMetaAction } from "@/state/interface";
import { generateAsyncAction } from "@/state/utils";

export type CategoryState = BaseState<CategoryEntity>;

export interface CategoryEntity extends Entity {
  name: string;
}

export const CategoryActionTypes = {
  FETCH: generateAsyncAction('@@category.FETCH'),
  FETCH_BY_ID: generateAsyncAction('@@category.FETCH_BY_ID'),
  CREATE: generateAsyncAction('@@category.CREATE'),
  UPDATE: generateAsyncAction('@@category.UPDATE'),
  DELETE: generateAsyncAction('@@category.DELETE'),
  SET: '@@category.SET',
  CLEAR: '@@category.CLEAR',
};

export interface CategoryActions {
  fetchCategorys: () => TMetaAction;
  createEvent: (category: CategoryEntity) => TPayloadMetaAction<CategoryEntity>;
  updateEvent: (category: CategoryEntity) => TPayloadMetaAction<CategoryEntity>;
  deleteEvent: (category: CategoryEntity) => TPayloadMetaAction<CategoryEntity>;
  setCategory: (category: CategoryEntity) => TPayloadMetaAction<CategoryEntity>;
  clear: () => TMetaAction;
}