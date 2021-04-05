import { ImageEntity } from '@/state/interface';

export interface PreviewFile {
  /* Unique id of the file */
  uid: string;
  /* Url of the file */
  url: string;
}

export interface ImagePreviewInterface {
  /* Whether to allow preview of image */
  allowPreview: boolean;
  /* The image object to preview */
  image: PreviewFile | undefined;
}

export interface ImageUploadInterface {
  /* Whether to allow preview of image */
  allowPreview?: boolean;
  /* Allow upload of multiple images */
  allowMultiple?: boolean;
  /* Allow cropping image(s) before upload */
  allowCrop?: boolean;
  /* The aspect-ratio of the crop*/
  cropAspect?: number;
  /* The input value */
  value?: File[];
  onChange?: (value: File[]) => void;
}
