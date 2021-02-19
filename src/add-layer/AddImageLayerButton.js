import { Button } from '../core';

const AddImageLayerButton = ({ onClick }) => (
  <Button onClick={onClick}>
    <i className="fas fa-pen-image"></i>
    이미지
  </Button>
);

export default AddImageLayerButton;
