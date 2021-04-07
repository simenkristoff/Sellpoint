import React from 'react';
import { PageHeader, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

/**
 * Displays the Advert Data Managers Header.
 */
interface AdvertDataHeaderInterface {
  edit: () => void;
}

export const AdvertDataHeader: React.FC<AdvertDataHeaderInterface> = ({ edit }: AdvertDataHeaderInterface) => {
  return (
    <PageHeader
      ghost={false}
      title='Mine reklamer'
      extra={[
        <Button key='1' type='primary' size='large' className='hide-sm' icon={<PlusOutlined />} onClick={() => edit()}>
          Legg til ny reklame
        </Button>,
      ]}
    />
  );
};
