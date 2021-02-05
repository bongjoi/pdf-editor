import { useCurrentPage } from '../hooks/useCurrentPage';
import { useNumberOfPages } from '../hooks/useNumberOfPages';

const CurrentPageLabel = ({ children, store }) => {
  const { currentPage } = useCurrentPage(store);
  const { numberOfPages } = useNumberOfPages(store);

  const defaultChildren = (props) => <>{props.currentPage + 1}</>;

  const render = children || defaultChildren;
  return render({
    currentPage,
    numberOfPages
  });
};

export default CurrentPageLabel;
