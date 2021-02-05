import GoToLastPageButton from './GoToLastPageButton';
import { useNumberOfPages } from '../hooks/useNumberOfPages';

const GoToLastPage = ({ children, store }) => {
  const { numberOfPages } = useNumberOfPages(store);

  const goToLastPage = () => {
    const jumpToPage = store.get('jumpToPage');
    if (jumpToPage) {
      jumpToPage(numberOfPages - 1);
    }
  };

  const defaultChildren = (props) => (
    <GoToLastPageButton onClick={props.onClick} />
  );
  const render = children || defaultChildren;

  return render({
    onClick: goToLastPage
  });
};

export default GoToLastPage;
