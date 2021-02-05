import GoToNextPageButton from './GoToNextPageButton';
import { useCurrentPage } from '../hooks/useCurrentPage';
import { useNumberOfPages } from '../hooks/useNumberOfPages';

const GoToNextPage = ({ children, store }) => {
  const { currentPage } = useCurrentPage(store);
  const { numberOfPages } = useNumberOfPages(store);

  const goToNextPage = () => {
    const jumpToPage = store.get('jumpToPage');
    if (jumpToPage) {
      jumpToPage(currentPage + 1);
    }
  };

  const defaultChildren = (props) => (
    <GoToNextPageButton onClick={props.onClick} isDisabled={props.isDisabled} />
  );

  const render = children || defaultChildren;
  return render({
    isDisabled: currentPage + 1 >= numberOfPages,
    onClick: goToNextPage
  });
};

export default GoToNextPage;
