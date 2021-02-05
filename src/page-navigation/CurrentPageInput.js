import { useState } from 'react';
import { useCurrentPage } from '../hooks/useCurrentPage';
import { useNumberOfPages } from '../hooks/useNumberOfPages';

const CurrentPageInput = ({ store }) => {
  const [pageTextboxFocused, setPageTextboxFocused] = useState(false);
  const [editingPage, setEditingPage] = useState(0);

  const { currentPage } = useCurrentPage(store);
  const { numberOfPages } = useNumberOfPages(store);

  const changePage = (event) => {
    const newPage = parseInt(event.target.value, 10);
    if (newPage > 0 && newPage <= numberOfPages) {
      setEditingPage(newPage - 1);
    }
  };

  const focusPageTextbox = () => {
    setPageTextboxFocused(true);
    setEditingPage(currentPage);
  };

  const blurPageTextbox = () => {
    setPageTextboxFocused(false);
  };

  const jumpTo = (page) => {
    const jumpToPage = store.get('jumpToPage');
    if (jumpToPage) {
      jumpToPage(page);
    }
  };

  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage < numberOfPages) {
      setEditingPage(nextPage);
      jumpTo(nextPage);
    }
  };

  const goToPreviousPage = () => {
    const previousPage = currentPage - 1;
    if (previousPage >= numberOfPages) {
      setEditingPage(previousPage);
      jumpTo(previousPage);
    }
  };

  const keydownPage = (event) => {
    switch (event.keyCode) {
      case 38:
        goToPreviousPage();
        break;
      case 40:
        goToNextPage();
        break;
      case 13:
        jumpTo(editingPage);
        break;
      default:
        break;
    }
  };

  return (
    <input
      className="pdf-editor-current-page-input"
      type="text"
      value={pageTextboxFocused ? editingPage + 1 : currentPage + 1}
      onChange={changePage}
      onFocus={focusPageTextbox}
      onBlur={blurPageTextbox}
      onKeyDown={keydownPage}
    />
  );
};

export default CurrentPageInput;
