import React from 'react';
import './Border.css';

type Props = {
  bottom?: boolean,
};

const Border = ({ ...props }: Props) => {
  const className = props.bottom ? 'border-bottom' : 'border-top';
  return <div className={className} />;
};

Border.defaultProps = {
  bottom: false,
};

export default Border;
