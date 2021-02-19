import AddCheckLayerButton from './AddCheckLayerButton';

const AddCheckLayer = ({ children, store }) => {
  const defaultChildren = (props) => (
    <AddCheckLayerButton onClick={props.onClick} />
  );
  const render = children || defaultChildren;

  return render({
    onClick: (e) => console.log(e)
  });
};

export default AddCheckLayer;
