import React, { useState } from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload/interface';
import ImgCrop from 'antd-img-crop';
import { ImagePreview } from './ImagePreview';
import { ImageUploadInterface, PreviewFile } from './interface';

export const ImageUpload: React.FC<ImageUploadInterface> = ({ allowMultiple, allowCrop, cropAspect, onChange }: ImageUploadInterface) => {
  const [previewImage, setPreviewImage] = useState<PreviewFile>();

  const handleChange = ({ fileList }: UploadChangeParam<UploadFile<any>>) => {
    const fileObjs: File[] = [];
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

  const onPreview = async (file: UploadFile<any>) => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    setPreviewImage({ uid: file.uid, url: src as string });
  };

  const onRemove = (file: UploadFile<any>) => {
    if (previewImage?.uid === file.uid) {
      setPreviewImage(undefined);
    }
  };

  const props: UploadProps = {
    onChange: handleChange,
    onPreview,
    onRemove,
    customRequest: ({ onSuccess, file }) => {
      if (file && onSuccess) {
        onSuccess(null, new XMLHttpRequest());
      }
    },
    multiple: allowMultiple,
    listType: 'picture-card',
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
      <ImagePreview allowPreview image={previewImage} />
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
