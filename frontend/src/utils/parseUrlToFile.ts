import { ImageEntity } from '@/state/interface';

const parseUrlToFile = (img: ImageEntity) => {
  return fetch(`http://localhost:8000${img.image}`)
    .then(r => r.blob())
    .then(blobFile => new File([blobFile], img.image, { type: 'image/png' }))
    .then(file => {
      return {
        uid: img.id.toString(),
        size: file.size,
        name: file.name,
        lastModified: file.lastModified,
        url: `http://localhost:8000${img.image}`,
        type: file.type,
        originFileObj: file,
      };
    });
};

export default parseUrlToFile;
