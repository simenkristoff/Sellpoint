import React from 'react';
import { Button, Card, Input, Space, InputNumber, Checkbox, Select, Row, Col, Form, FormInstance} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ProductEntity } from '@/state/ducks/product/types';
import { textSpanIntersectsWithTextSpan } from 'typescript';
import FormItem from 'antd/lib/form/FormItem';

const onSearch = (value: any) => console.log(value);

const {Option} = Select;

function onChange(value: any) {
    console.log('changed', value);
  }

function onChanged(e: { target: { checked: any; }; }) {
  console.log(`checked = ${e.target.checked}`);
}

function handleChange(value: any) {
    console.log(`selected ${value}`);
  }

interface IProps {
  products: ProductEntity[];
  searchText: string;
  maxPrice: number;
  newToday: boolean;
  category: string;
  area: string;
}

interface IPropsTest {
  filterProducts: (changedFields: any, allFields: any) => void;
  form: FormInstance<any>;
}

// function filterProducts() {

// }

export const ProductFilter: React.FC<IPropsTest> = ({filterProducts, form}) => {
    
    return(
        <div>
            <br/>
            <Form form={form} onFieldsChange={filterProducts} name='filter-form'>
            <Card title="Filtrer produkter" style={{ width: 1050 }}>
            <Row>
                <Space size='middle'>
                <Col>
                <Form.Item name='searchText'>
                  <Input placeholder='Søketekst'/>
                </Form.Item>
                </Col>
                <Col>
                    <Row>
                        <Space>
                          <Form.Item label='Makspris' name='maxPrice'>
                            <InputNumber placeholder='123'/>
                          </Form.Item>
                        </Space>
                    </Row>
                </Col>
                <Col>
                  <Form.Item name='newToday'>
                    <Checkbox onChange={onChanged} id='newToday'>Nye i dag</Checkbox>
                  </Form.Item>
                </Col>
                {/* <Col>
                    <Row>
                        <Space>
                          <Form.Item name='category'>
                            <Select placeholder='Velg kategori' style={{ width: 135 }} onChange={handleChange}>
                              <Option value='clothes'>Klær</Option>
                              <Option value='electronics'>Elektronikk</Option>  
                              <Option value='furniture'>Møbler</Option>
                              <Option value='toys'>Leker</Option>
                            </Select>
                            </Form.Item>
                        </Space>
                    </Row>
                </Col> */}
                {/* <Col>
                    <Row>
                        <Space>
                          <Form.Item name='area'>
                            <Select placeholder='Velg område' style={{ width: 135 }} onChange={handleChange}>
                              <Option value='oslo'>Oslo</Option>
                              <Option value='trondheim'>Trondheim</Option>
                              <Option value='bergen'>Bergen</Option>
                            </Select>
                            </Form.Item>
                        </Space>
                    </Row>
                </Col> */}
                <Col>
                  <Form.Item>
                    <Button type='primary' htmlType="submit">Søk</Button>
                  </Form.Item>
                </Col>
                </Space>
            </Row>
        </Card>
        </Form>
        </div>
    )
}