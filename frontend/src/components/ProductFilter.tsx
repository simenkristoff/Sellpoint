import React from 'react';
import { Button, Card, Input, Space, InputNumber, Menu, Dropdown, Checkbox, Select, Row, Col} from 'antd';
import { DownOutlined } from '@ant-design/icons';

const onSearch = (value: any) => console.log(value);

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

export const ProductFilter: React.FC = () => {
    return(
        <div>
            <br/>
            <Card title="Filtrer produkter" style={{ width: 1050 }}>
            <Row>
                <Space size='middle'>
                <Col>
                    <Input placeholder="Søketekst"/>
                </Col>
                <Col>
                    <Row>
                        <Space>
                            <div className='product-filter-text'>Makspris</div>
                            <InputNumber onChange={onChange} placeholder='123' />
                        </Space>
                    </Row>
                </Col>
                <Col>
                    <Checkbox onChange={onChanged}>Nye i dag</Checkbox>
                </Col>
                <Col>
                    <Row>
                        <Space>
                            <div className='product-filter-text'>Kategori</div>
                            <Select placeholder='Velg kategori' style={{ width: 135 }} onChange={handleChange}></Select>
                        </Space>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Space>
                            <div className='product-filter-text'>Område</div>
                            <Select placeholder='Velg område' style={{ width: 135 }} onChange={handleChange}></Select>
                        </Space>
                    </Row>
                </Col>
                <Col>
                    <Button type='primary'>Søk</Button>
                </Col>
                </Space>
            </Row>
        </Card>
        </div>
    )
}