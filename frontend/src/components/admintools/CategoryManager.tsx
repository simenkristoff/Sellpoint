import { Button, Form, Input } from "antd";
import React from "react";

/**
 * Category Manager Component. A panel to add, remove and view categories.
 */
export const CategoryManager: React.FC = () => {
  return (
    <div>
      <h3>Legg til kategori</h3>
      <Form>
        <Form.Item name='category name' rules={[{ required: true}]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button>
            Legg til
          </Button>
        </Form.Item>
      </Form>
      <h3>Kategorier</h3>
    </div>
  );
};