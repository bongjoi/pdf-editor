import AddImageLayerButton from './AddImageLayerButton';

const AddImageLayer = ({ children, store }) => {
  const defaultChildren = (props) => (
    <AddImageLayerButton onClick={props.onClick} />
  );
  const render = children || defaultChildren;

  return render({
    onClick: (e) => console.log(e)
  });
};

export default AddImageLayer;
