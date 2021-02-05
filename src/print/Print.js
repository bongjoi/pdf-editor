import PrintButton from './PrintButton';
import PrintStatus from './PrintStatus';

const Print = ({ children, store }) => {
  const print = () => {
    store.update('printStatus', PrintStatus.Preparing);
  };

  const defaultChildern = (props) => <PrintButton onClick={props.onClick} />;
  const render = children || defaultChildern;

  return render({
    onClick: print
  });
};

export default Print;
