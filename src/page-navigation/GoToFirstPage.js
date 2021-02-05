import GoToFirstPageButton from './GoToFirstPageButton';

const GoToFirstPage = ({ children, store }) => {
  const goToFirstPage = () => {
    const jumpToPage = store.get('jumpToPage');
    if (jumpToPage) {
      jumpToPage(0);
    }
  };

  const defaultChildren = (props) => (
    <GoToFirstPageButton onClick={props.onClick} />
  );
  const render = children || defaultChildren;

  return render({
    onClick: goToFirstPage
  });
};

export default GoToFirstPage;
