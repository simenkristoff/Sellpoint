import React, { useEffect } from 'react';
import { Form, Modal } from 'antd';
import { AdvertEntity } from '@/state/ducks/advert/types';
import { AdvertForm } from '../forms';

interface AdvertDataModalInterface {
  visible: boolean;
  editMode: boolean;
  byId: AdvertEntity | {};
  submit: (values: AdvertEntity) => void;
  close: () => void;
}

export const AdvertDataModal: React.FC<AdvertDataModalInterface> = (props: AdvertDataModalInterface) => {
  const { visible, editMode, byId, submit, close } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [visible]);

  const style: React.CSSProperties = {
    maxWidth: '1200px',
  };

  return (
    <Modal
      title={editMode ? 'Rediger reklame' : 'Opprett ny reklame'}
      okText={editMode ? 'Lagre endringer' : 'Legg til'}
      style={style}
      width={'100%'}
      visible={visible}
      afterClose={() => {
        form.resetFields();
      }}
      onCancel={() => {
        form.resetFields();
        close();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            submit(values);
          })
          .catch(info => {
            console.warn('Validation failed: ', info);
          });
      }}
    >
      <AdvertForm form={form} data={byId} editMode={editMode} />
    </Modal>
  );
};
