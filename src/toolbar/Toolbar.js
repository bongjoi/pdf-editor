import DefaultToolbar from './DefaultToolbar';

const Toolbar = ({ children, slot }) => {
  const render = children || DefaultToolbar;
  return render(slot);
};

export default Toolbar;
