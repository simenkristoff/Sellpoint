import { apiCaller } from "@/state/utils";
import { Button, Form, Input } from "antd";
import React from "react";

interface Category {
  name: string;
}

const addCategory = (category: Category) => {
  apiCaller('POST', 'product/categories/', category)
}

/**
 * Category Manager Component. A panel to add, remove and view categories.
 */
export const CategoryManager: React.FC = () => {
  return (
    <div>
      <h3>Legg til kategori</h3>
      <Form onFinish={addCategory} layout='inline' requiredMark='optional'>
        <Form.Item name='name' label='Kategorinavn' rules={[{ required: true, message: 'Vennligst skriv inn et navn' }, { max: 24, message: 'Maks lengde på kategorinavn er 24' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Legg til
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};