import React from 'react';

interface IProps {
  className?: string;
  style?: React.CSSProperties;
  size: 'default' | 'full';
  children?: JSX.Element | JSX.Element[];
}

/**
 * Container component. Wrapper component which wraps elements in a responsive width. Used to ensure
 * that components responds to different screen sizes.
 *
 * @typedef {IProps} Props
 */
export const Container: React.FC<IProps> = ({ className, style, size, ...props }: IProps) => {
  const classes: string[] = [];
  classes.push(size === 'full' ? 'container-full' : 'container');
  if (className) {
    className.split(' ').forEach(_c => {
      classes.push(_c);
    });
  }

  return (
    <div className={classes.join(' ')} style={style}>
      {props.children}
    </div>
  );
};
