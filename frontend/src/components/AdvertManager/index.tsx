import React from 'react';
import { Tabs } from 'antd';
import { AdvertForm } from '../forms';
import { AdvertEntity } from '@/state/ducks/advert/types';
import { AdvertDataList } from './AdvertDataList';
import { AdvertDataHeader } from './AdvertDataHeader';
import { AdvertDataModal } from './AdvertDataModal';

interface AdvertManagerInterface {
  data: AdvertEntity[];
  byId: AdvertEntity | {};
  visible: boolean;
  editMode: boolean;
  submit: (advert: AdvertEntity) => void;
  edit: (advert?: AdvertEntity) => void;
  remove: (advert: AdvertEntity) => void;
  close: () => void;
}

const AdvertManager: React.FC<AdvertManagerInterface> = (props: AdvertManagerInterface) => {
  const { data, byId, visible, editMode, submit, edit, remove, close } = props;

  return (
    <div className='advert_data-manager'>
      <AdvertDataHeader edit={edit} />
      <AdvertDataList {...props} />
      <AdvertDataModal {...props} />
    </div>
  );
};

export default AdvertManager;
