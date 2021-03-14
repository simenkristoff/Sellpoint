import React, { useState } from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload/interface';
import ImgCrop from 'antd-img-crop';
import { ImagePreview } from './ImagePreview';

interface IProps {
  allowMultiple?: boolean;
  allowCrop?: boolean;
  cropAspect?: number;
  allowPreview?: boolean;
  value?: File[];
  onChange?: (value: File[]) => void;
}

export const ImageUpload: React.FC<IProps> = ({ allowMultiple, allowCrop, cropAspect, value, onChange }: IProps) => {
  const [files, setFiles] = useState<UploadFile<any>[]>();

  const handleChange = ({ fileList }: UploadChangeParam<UploadFile<any>>) => {
    const fileObjs: File[] = [];
    setFiles(fileList);
    fileList.forEach(file => {
      if (file.originFileObj) {
        const fileObj = file.originFileObj as File;
        fileObjs.push(fileObj);
      }
    });

    if (onChange) {
      onChange(fileObjs);
    }
  };

  const props: UploadProps = {
    onChange: handleChange,
    customRequest: ({ onSuccess, file }) => {
      if (file && onSuccess) {
        onSuccess(null, new XMLHttpRequest());
      }
    },
    multiple: allowMultiple,
    listType: 'picture',
    accept: 'image/png, image/jpeg',
  };

  const renderUpload = () => {
    return (
      <Upload.Dragger {...props}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>Klikk eller dra filer til dette området for å laste opp</p>
        {allowMultiple && <p className='ant-upload-hint'>Støtter opplasting av flere filer.</p>}
      </Upload.Dragger>
    );
  };

  const render = () => {
    if (allowCrop) {
      return (
        <ImgCrop rotate zoom grid aspect={cropAspect}>
          {renderUpload()}
        </ImgCrop>
      );
    }

    return renderUpload();
  };

  return (
    <div className='upload-wrapper'>
      <ImagePreview allowPreview images={files} />
      {render()}
    </div>
  );
};

ImageUpload.defaultProps = {
  allowMultiple: true,
  allowCrop: false,
  cropAspect: 3 / 1,
  allowPreview: true,
};
