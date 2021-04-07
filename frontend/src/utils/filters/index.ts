import { useState } from 'react';
import _, { isArray } from 'lodash';

import { FilterFunctions, FilterInterface, FilterState, FilterTypeInterface, SearchFilterType } from './interface';
import { Entity } from '@/state/interface';

/**
 * Initializes the filters and creates functions for filtering
 * the specified types.
 * @param {FilterTypeInterface<T>} filterTypes filters to apply
 * @param {SearchFilterType<T>} searchFilterTypes search filter (optional)
 * @returns {FilterInterface} filter state
 */
export function initializeFilters<T extends Entity>(
  filterTypes: FilterTypeInterface<T>,
  searchFilterTypes?: SearchFilterType<T>,
): FilterInterface {
  let initialFilterState: FilterState = { search: [] };
  let filterFunctions: FilterFunctions = {};
  if (searchFilterTypes) {
    initialFilterState = { ...initialFilterState, search: [] };

    // Handle Search Filter
    Object.entries(searchFilterTypes).map(([key, values]) => {
      const vals = values;
      filterFunctions = {
        ...filterFunctions,
        search: (item: any) => {
          let found = false;
          found = (values as any).some((value: any): boolean => {
            let field = item[value as string];
            if (Array.isArray(field)) {
              field = field.join(' ');
            }

            return field.toLowerCase().includes(filterState.search.toString().toLowerCase());
          });

          return found;
        },
      };
    });
  }
  // Handle Filter for Slider
  Object.entries(filterTypes).map(([key, value]) => {
    initialFilterState = { ...initialFilterState, [key]: [0, 100000] };
    filterFunctions = {
      ...filterFunctions,
      [key]: (val: number) => {
        const low = filterState[key][0];
        const high = filterState[key][1];
        if (low <= val && val <= high) {
          return true;
        }

        return false;
      },
    };
  });
  // Handle Filter for Select, Checkbox
  Object.entries(filterTypes).map(([key, value]) => {
    switch (value?.type) {
      case 'select':
        initialFilterState = { ...initialFilterState, [key]: [''] };
        filterFunctions = {
          ...filterFunctions,
          [key]: (val: string) => {
            if (typeof val === 'number') {
              return val === filterState[key][0];
            } else if (isArray(val)) {
              return val.includes(filterState[key][0]);
            }

            return val.toLowerCase() === filterState[key].toString().toLowerCase();
          },
        };
        break;
      case 'text':
      default:
        return true;
    }
  });
  const [filterState, setFilterState] = useState<FilterState>({ ...initialFilterState });

  return { initialFilterState, filterState, setFilterState, filterFunctions };
}

/**
 * Runs through all defined filter functions and
 * returns a filtered array
 * @param array the data to filter
 * @param filters the filters to apply
 * @param filterState the values to apply on the filter
 * @returns {Array<any>} filtered data
 */
export function filterArray(array: Array<any>, filters: FilterFunctions, filterState: FilterState): Array<any> {
  const filterKeys = Object.keys(filters);

  return array.filter(item => {
    return filterKeys.every((key, index) => {
      if (filterState[key].length < 1 || filterState[key][0].length < 1) return true;
      if (typeof filters[key] !== 'function') return true;
      if (key === 'search') return filters[key](item);

      return filters[key](item[key]);
    });
  });
}

export * from './interface';
export { default as renderSliderFilter } from './renderSliderFilter';
export { default as renderSelectFilter } from './renderSelectFilter';
