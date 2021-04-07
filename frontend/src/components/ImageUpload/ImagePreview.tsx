import React from 'react';
import { Image } from 'antd';
import { ImagePreviewInterface } from './interface';

export const ImagePreview: React.FC<ImagePreviewInterface> = ({ allowPreview, image }: ImagePreviewInterface) => {
  if (!allowPreview || !image) return null;

  return <Image preview={false} src={image.url} />;
};
