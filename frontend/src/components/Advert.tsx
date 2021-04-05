import React, { useEffect, useState } from 'react';
import { AdvertEntity } from '@/state/ducks/advert/types';

interface IProps {
  /* Advert to display */
  ad?: AdvertEntity;
  /** Inline css styles */
  style?: React.CSSProperties;
  /* Advert size */
  size?: 'default' | 'large';
  /* Render shadow */
  hasShadow?: boolean;
  /* Additional classes */
  className?: string;
}

export const Advert: React.FC<IProps> = ({ ad, style, size, hasShadow, className }: IProps) => {
  const classes: string[] = ['advert'];
  const imgClasses: string[] = [];
  if (!ad || ad.images.length < 1) return null;
  classes.push(`advert_${size as string}`);
  if (className) {
    className.split(' ').forEach(_c => {
      classes.push(_c);
    });
  }
  if (hasShadow) imgClasses.push('img-shadow');
  console.log(ad);

  return (
    <a className={classes.join(' ')} style={style} href={ad.link}>
      <div className='wrapper'>
        <div className='overlay' />
        <img className={imgClasses.join(' ')} src={`http://localhost:8000${ad.images[0].image}`} alt={ad.title} />
      </div>
    </a>
  );
};

Advert.defaultProps = {
  size: 'default',
  hasShadow: true,
};
