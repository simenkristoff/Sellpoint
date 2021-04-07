import React from 'react';
import { Entity } from '@/state/interface';
import { Form, Select } from 'antd';
import { FilterDependency } from './interface';

const filterOption = (input: string, option: any) => {
  return option.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

function renderSelectFilter<T extends Entity>(
  index: number,
  name: string,
  dependency: FilterDependency,
  field?: string,
  label?: string,
  postfix?: string,
) {
  return (
    <Form.Item name={name} label={label && label} key={`${name}_${index}`}>
      <Select showSearch filterOption={filterOption} placeholder='-- Velg --'>
        {dependency.map(item => {
          const key = field ? (item as T).id : item;
          const value = field ? (item as T).id : item;
          const name = field ? (item as any)[field] : item;

          return (
            <Select.Option key={key} value={value}>
              {name}
              {postfix && postfix}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );
}

export default renderSelectFilter;
