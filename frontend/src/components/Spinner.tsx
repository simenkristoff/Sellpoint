import React from 'react';
import { Spin } from 'antd';

interface IProps {
  /** Spinner will spin on true */
  loading: boolean;
  /** Center the spinner */
  centered?: boolean;
  /** Additional classes */
  className?: string;
}

/**
 * Spinner component. Displays a spinner, useful when loading content.
 * @typedef {IProps} Props
 */
export const Spinner: React.FC<IProps> = ({ loading, centered, className }: IProps) => {
  if (!loading) return null;
  const classes: string[] = ['spinner'];
  if (centered) classes.push('spinner-centered');
  if (className) {
    className.split(' ').forEach(_c => {
      classes.push(_c);
    });
  }

  return <Spin className={classes.join(' ')} />;
};

Spinner.defaultProps = {
  centered: false,
};
