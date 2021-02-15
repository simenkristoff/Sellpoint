import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Result } from 'antd';

import { ApiResponse } from '@/state/interface';

interface IProps {
  /** Response message from API */
  response: ApiResponse | null;
  /** Additional classes */
  className?: string;
  /** Content alignment */
  align?: 'left' | 'center' | 'right';
  /** Display error as a jumbotron */
  jumbotron?: boolean;
}

export const ErrorResponse: React.FC<IProps> = ({ response, className, align, jumbotron }: IProps) => {
  const classes = ['error-message'];
  if (className) classes.push(className);
  if (align) classes.push(`text-${align}`);

  function render() {
    if (response) {
      if (jumbotron) {
        return <Result status='error' title={response} />;
      }

      return (
        <span>
          <InfoCircleOutlined />
          &nbsp;{response}
        </span>
      );
    }

    return null;
  }

  return <div className={classes.toString().replace(',', ' ')}>{render()}</div>;
};

ErrorResponse.defaultProps = {
  align: 'center',
  jumbotron: false,
};
