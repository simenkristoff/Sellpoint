import React, { useState } from 'react';
import { Entity } from '@/state/interface';
import { Form, InputNumber, Select, Slider } from 'antd';
import { FilterDependency } from './interface';

function renderSliderFilter<T extends Entity>(
  onFieldsChange: (changedFields: Array<any>) => void,
  index: number,
  name: string,
  dependency: FilterDependency,
  field?: string,
  label?: string,
  postfix?: string,
) {
  const marks = {
    [dependency[0]]: dependency[0].toString(),
    [dependency[1]]: dependency[1].toString(),
  };

  const handleChange = (value: [number, number]) => {
    const field = {
      name: [name],
      value,
    };
    onFieldsChange([field]);
  };

  return (
    <Form.Item name={name} label={label && label} key={`${name}_${index}`}>
      <Slider
        onAfterChange={handleChange}
        range
        marks={marks}
        defaultValue={[dependency[0], dependency[1]]}
        min={dependency[0]}
        max={dependency[1]}
      />
    </Form.Item>
  );
}

export default renderSliderFilter;
