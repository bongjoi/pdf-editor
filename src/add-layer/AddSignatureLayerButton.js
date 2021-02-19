import { Button } from '../core';

const AddSignatureLayerButton = ({ onClick }) => (
  <Button onClick={onClick}>
    <i className="fas fa-pen-fancy"></i>
    사인
  </Button>
);

export default AddSignatureLayerButton;
