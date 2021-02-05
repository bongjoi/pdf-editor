import { useState } from 'react';

let ToggleStatus;
(function (ToggleStatus) {
  ToggleStatus['Close'] = 'Close';
  ToggleStatus['Open'] = 'Open';
  ToggleStatus['Toggle'] = 'Toggle';
})(ToggleStatus || (ToggleStatus = {}));

export { ToggleStatus };

export const useToggle = () => {
  const [opened, setOpened] = useState(false);
  const toggle = (status) => {
    switch (status) {
      case ToggleStatus.Close:
        setOpened(false);
        break;
      case ToggleStatus.Open:
        setOpened(true);
        break;
      case ToggleStatus.Toggle:
      default:
        setOpened((isOpened) => !isOpened);
        break;
    }
  };

  return { opened, toggle };
};
