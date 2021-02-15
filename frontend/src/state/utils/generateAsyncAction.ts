import { AsyncActionType } from '../interface';

/**
 * Generate an async action type.
 * @param {string} name basename of the action
 */
export const generateAsyncAction = (name: string): AsyncActionType => ({
  START: `${name}.START`,
  SUCCESS: `${name}.SUCCESS`,
  ERROR: `${name}.ERROR`,
});
