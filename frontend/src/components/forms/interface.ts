import { Entity } from '@/state/interface';
import { FormInstance } from 'antd';

export interface DataFormInterface<T extends Entity> {
  form: FormInstance<any>;
  initialValues?: T;
  data: T | {};
  editMode: boolean;
}
