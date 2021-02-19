import { Button } from '../core';

const AddTextLayerButton = ({ onClick }) => (
  <Button onClick={onClick}>
    <i className="fas fa-edit"></i>
    텍스트
  </Button>
);

export default AddTextLayerButton;
