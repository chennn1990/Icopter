import React from 'react';
import styled from 'styled-components';

const BorderStyle = styled.div`
  .border {
    height: 60px;
    background: #857979;
    width: 100%;
  }
`;

const Border = () => (
  <BorderStyle>
    <div className="border" />
  </BorderStyle>
);

export default Border;
