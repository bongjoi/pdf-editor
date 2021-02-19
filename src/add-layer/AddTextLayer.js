import { useState } from 'react';
import AddTextLayerButton from './AddTextLayerButton';

const AddTextLayer = ({ children, store }) => {
  const defaultChildren = (props) => (
    <AddTextLayerButton onClick={props.onClick} />
  );
  const render = children || defaultChildren;

  return render({
    onClick: (e) => console.log(e)
  });
};

export default AddTextLayer;
