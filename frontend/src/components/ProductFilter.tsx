import React from 'react';
import { Button, Card, Input, Space, InputNumber, Menu, Dropdown, Checkbox, Select, Row, Col} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ProductEntity } from '@/state/ducks/product/types';

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

const menu = (
  <Menu>
    <Menu.Item>
      <p>Kategori 1</p>
    </Menu.Item>
    <Menu.Item icon={<DownOutlined />} disabled>
      <p>Kategori 2</p>
    </Menu.Item>
    <Menu.Item disabled>
      <p>Kategori 3</p>
    </Menu.Item>
    <Menu.Item>
        <p>Kategori 4</p>
    </Menu.Item>
  </Menu>
);

interface IProps {
  products: ProductEntity[];
  searchText: Input;
  maxPrice: number;
  newToday: Boolean;
  category: typeof Select;
  area: typeof Select;
}

function filterProducts() {
  let searchText = document.getElementById('searchText');
  let maxPrice = document.getElementById('maxPrice');
  let newToday = document.getElementById('newToday');
  let category = document.getElementById('category');
  let area = document.getElementById('area');
}

export const ProductFilter: React.FC = () => {
    return(
        <div>
            <br/>
            <Card title="Filtrer produkter" style={{ width: 1050 }}>
            <Row>
                <Space size='middle'>
                <Col>
                    <Input placeholder="Søketekst" id='searchText'/>
                </Col>
                <Col>
                    <Row>
                        <Space>
                            <div className='product-filter-text'>Makspris</div>
                            <InputNumber onChange={onChange} placeholder='123' id='maxPrice'/>
                        </Space>
                    </Row>
                </Col>
                <Col>
                    <Checkbox onChange={onChanged} id='newToday'>Nye i dag</Checkbox>
                </Col>
                <Col>
                    <Row>
                        <Space>
                            <div className='product-filter-text'>Kategori</div>
                            <Select placeholder='Velg kategori' style={{ width: 135 }} onChange={handleChange} id='category'>
                              <Option value='clothes'>Klær</Option>
                              <Option value='electronics'>Elektronikk</Option>  
                              <Option value='furniture'>Møbler</Option>
                              <Option value='toys'>Leker</Option>
                            </Select>
                        </Space>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Space>
                            <div className='product-filter-text'>Område</div>
                            <Select placeholder='Velg område' style={{ width: 135 }} onChange={handleChange} id='area'>
                              <Option value='oslo'>Oslo</Option>
                              <Option value='trondheim'>Trondheim</Option>
                              <Option value='bergen'>Bergen</Option>
                            </Select>
                        </Space>
                    </Row>
                </Col>
                <Col>
                    <Button type='primary' onClick={filterProducts}>Søk</Button>
                </Col>
                </Space>
            </Row>
        </Card>
        </div>
    )
}