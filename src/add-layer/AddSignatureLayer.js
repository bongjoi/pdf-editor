import AddSignatureLayerButton from './AddSignatureLayerButton';

const AddSignatureLayer = ({ children, store }) => {
  const defaultChildren = (props) => (
    <AddSignatureLayerButton onClick={props.onClick} />
  );
  const render = children || defaultChildren;

  return render({
    onClick: (e) => console.log(e)
  });
};

export default AddSignatureLayer;
