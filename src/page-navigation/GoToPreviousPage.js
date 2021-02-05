import GoToPreviousPageButton from './GoToPreviousPageButton';
import { useCurrentPage } from '../hooks/useCurrentPage';

const GoToPreviousPage = ({ store, children }) => {
  const { currentPage } = useCurrentPage(store);

  const goToPreviousPage = () => {
    const jumpToPage = store.get('jumpToPage');
    if (jumpToPage) {
      jumpToPage(currentPage - 1);
    }
  };

  const defaultChildren = (props) => (
    <GoToPreviousPageButton
      isDisabled={props.isDisabled}
      onClick={props.onClick}
    />
  );
  const render = children || defaultChildren;

  return render({
    isDisabled: currentPage <= 0,
    onClick: goToPreviousPage
  });
};

export default GoToPreviousPage;
