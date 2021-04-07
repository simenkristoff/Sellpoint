/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';

interface IProps {
  initialRating: number;
  onClick: (rating: number) => void;
  style?: React.CSSProperties;
}

export const StarRating: React.FC<IProps> = ({ initialRating, onClick, style }) => {
  const numberOfStars = 5;
  const ratingRef = useRef<HTMLDivElement>(null);
  const [rating, setRating] = useState<number>(initialRating);

  useEffect(() => {
    setRating(initialRating);
    setCurrentRating(null);
  });

  const setCurrentRating = (event: any) => {
    const stars = ratingRef.current?.getElementsByClassName('star') as HTMLCollectionOf<HTMLElement>;
    Array.from(stars).forEach(star => {
      if (star.dataset.value) {
        star.style.color = rating >= parseInt(star.dataset.value) ? 'yellow' : 'gray';
      }
    });
  };

  const hoverHandler = (event: React.MouseEvent<HTMLElement> | undefined) => {
    if (event) {
      const eventTarget = event.target as HTMLElement;
      const stars = eventTarget.parentElement?.getElementsByClassName('star') as HTMLCollectionOf<HTMLElement>;
      const hoverValue = eventTarget.dataset.value;
      Array.from(stars).forEach(star => {
        if (hoverValue && star.dataset.value) {
          star.style.color = hoverValue >= star.dataset.value ? 'yellow' : 'gray';
        }
      });
    }
  };

  const starClickHandler = (event: React.MouseEvent<HTMLElement> | undefined) => {
    if (event) {
      const eventTarget = event.target as HTMLElement;
      const __rating = eventTarget.dataset.value;
      if (__rating) {
        setRating(parseInt(__rating));
        onClick(parseInt(__rating));
      }
    }
  };

  return (
    <div style={style} aria-hidden='true' className='rating' ref={ratingRef} data-rating={rating} onMouseOut={setCurrentRating}>
      {[...Array<number>(+numberOfStars).keys()].map(n => {
        return (
          <span aria-hidden='true' className='star' key={n + 1} data-value={n + 1} onMouseOver={hoverHandler} onClick={starClickHandler}>
            &#9733;
          </span>
        );
      })}
    </div>
  );
};
