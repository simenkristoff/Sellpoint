import React, { useEffect, useState } from 'react';
import { Carousel, Image } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';

interface IProps {
  allowPreview: Boolean;
  images: UploadFile<any>[] | undefined;
}

export const ImagePreview: React.FC<IProps> = ({ allowPreview, images }: IProps) => {
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  if (!allowPreview) return null;

  useEffect(() => {
    if (images) {
      createFileUrls(images);
      console.log(fileUrls);
    }
  }, [images]);

  async function createFileUrls(images: UploadFile<any>[]) {
    setFileUrls([]);
    await images.forEach(async image => {
      const fileObj = image.originFileObj as File;
      const src = await new Promise<string>(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(fileObj);
        reader.onload = () => resolve(reader.result as string);
      });
      setFileUrls([...fileUrls, src]);
    });
  }

  return (
    <Carousel dots dotPosition='top'>
      {fileUrls.map((url, index) => (
        <div key={index}>
          <Image preview={false} src={url as string} />
        </div>
      ))}
    </Carousel>
  );
};
