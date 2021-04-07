import { ImageEntity } from '@/state/interface';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Button, Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import React, { useRef, useState } from 'react';

interface IProps {
  images: ImageEntity[];
}

export const ProductGallery: React.FC<IProps> = ({ images }: IProps) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const galleryRef = useRef<CarouselRef>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (galleryRef !== null) {
      galleryRef.current?.next();
      if (imageIndex > images.length - 2) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
      updateThumb();
    }
  };

  const handleBack = () => {
    if (galleryRef !== null) {
      galleryRef.current?.prev();
      if (imageIndex < 1) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    }
  };

  const goTo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const targetIndex: number = parseInt((e.target as HTMLElement).getAttribute('data-index') as string);
    setImageIndex(targetIndex);
    galleryRef.current?.goTo(targetIndex);
    updateThumb();
  };

  const updateThumb = () => {
    const thumbs = (thumbRef.current?.children as unknown) as HTMLElement[];
    thumbs.forEach(thumb => {
      thumb.classList.remove('current');
    });
    const currentThumb: HTMLElement = thumbRef.current?.children[imageIndex] as HTMLElement;
    currentThumb.classList.add('current');
  };

  return (
    <div className='gallery-wrapper'>
      <div className='gallery-inner-wrapper'>
        <Carousel ref={galleryRef} className='product-gallery' dots={false} effect='scrollx'>
          {images.length > 0 &&
            images.map((image, index) => (
              <div key={index} className='img-slide'>
                <img src={`http://localhost:8000${image.image}`} alt={`${image.image}`} />
              </div>
            ))}
        </Carousel>
        <Button className='gallery-control back-btn' onClick={() => handleBack()}>
          <CaretLeftOutlined />
        </Button>
        <Button className='gallery-control next-btn' onClick={() => handleNext()}>
          <CaretRightOutlined />
        </Button>
      </div>
      <div ref={thumbRef} className='thumbnails'>
        {images.length > 0 &&
          images.map((image, index) => {
            const classes: string[] = ['img-thumb'];
            if (index === imageIndex) classes.push('current');

            return (
              <button onClick={e => goTo(e)} aria-hidden='true' role='link' key={index} className={classes.join(' ')}>
                <img data-index={index} src={`http://localhost:8000${image.image}`} alt={`${image.image}`} />
              </button>
            );
          })}
      </div>
    </div>
  );
};
