import { useState } from 'react';
import koKR from './ko_KR.json';
import LocalizationContext from './LocalizationContext';

const LocalizationProvider = ({ children, localization }) => {
  const defaultL10n = koKR;

  const [l10nData, setL10nData] = useState(localization || defaultL10n);
  const setLocalization = (l10n) => setL10nData(l10n);

  return (
    <LocalizationContext.Provider value={l10nData}>
      {children(setLocalization)}
    </LocalizationContext.Provider>
  );
};

export default LocalizationProvider;
