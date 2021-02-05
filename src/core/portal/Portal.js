import React from 'react';
import { useToggle } from '../../hooks/useToggle';

const Portal = ({ content, target }) => {
  const { opened, toggle } = useToggle();
  return (
    <>
      {target(toggle, opened)}
      {opened && content(toggle)}
    </>
  );
};

export default Portal;
