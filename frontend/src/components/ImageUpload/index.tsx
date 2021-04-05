import React, { useEffect, useState } from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload/interface';
import ImgCrop from 'antd-img-crop';
import { ImagePreview } from './ImagePreview';
import { ImageUploadInterface, PreviewFile } from './interface';
import { ImageEntity } from '@/state/interface';
import { parseUrlToFile } from '@/utils';

export const ImageUpload: React.FC<ImageUploadInterface> = ({
  allowMultiple,
  allowCrop,
  cropAspect,
  value,
  onChange,
}: ImageUploadInterface) => {
  const [fileList, setFileList] = useState<UploadFile<File>[]>([]);
  const [previewImage, setPreviewImage] = useState<PreviewFile>();

  const loadInitialImages = async () => {
    const initialFiles: UploadFile<File>[] = [];
    if (!value) return;
    for (let i = 0; i < value.length; i++) {
      const imgFile = await loadImage((value[i] as unknown) as ImageEntity);
      if (imgFile) initialFiles.push(imgFile);
    }
    setFileList(initialFiles);
  };

  const loadImage = async (img: ImageEntity) => {
    try {
      const blob = await fetch(`http://localhost:8000${img.image}`).then(b => b.blob());
      const file = new File([blob], img.image, { type: 'image/png' });

      const imageFile: UploadFile<File> = {
        uid: img.id.toString(),
        size: file.size,
        name: file.name,
        lastModified: file.lastModified,
        url: `http://localhost:8000${img.image}`,
        type: file.type,
        originFileObj: file,
      };

      return imageFile;
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadInitialImages();

    return () => setFileList([]);
  }, []);

  const handleChange = (event: UploadChangeParam<UploadFile<any>>) => {
    const fileObjs: File[] = [];
    if (allowMultiple) {
      setFileList([...event.fileList]);
      event.fileList.forEach(file => {
        if (file.originFileObj) {
          const fileObj = file.originFileObj as File;
          fileObjs.push(fileObj);
        }
      });
    } else {
      setFileList([event.fileList[event.fileList.length - 1]]);
      fileObjs.push(event.fileList[event.fileList.length - 1].originFileObj as File);
    }

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
    fileList: fileList,
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
