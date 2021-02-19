import { Button } from '../core';

const AddCheckLayerButton = ({ onClick }) => (
  <Button onClick={onClick}>
    <i className="fas fa-pen-check"></i>
    체크
  </Button>
);

export default AddCheckLayerButton;
