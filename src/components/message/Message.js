import React from 'react';
import styled from 'styled-components';

const MessageStyle = styled.div`
  position: absolute;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 30px;
  font-size: 30px;
  font-family: cursive;
  text-shadow: 2px 2px #cec8c8;
`;

type Props = {
  msg: string,
};

const Message = (props: Props) => <MessageStyle>{props.msg}</MessageStyle>;

export default Message;
