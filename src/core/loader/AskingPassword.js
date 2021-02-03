import React, { useContext, useState } from 'react';
import LocalizationContext from '../localization/LocalizationContext';
import ThemeContext from '../theme/ThemeContext';

const AskingPassword = ({ verifyPasswordFn }) => {
  const l10n = useContext(LocalizationContext);
  const theme = useContext(ThemeContext);
  const [password, setPassword] = useState('');

  const onChangePassword = (event) => setPassword(event.target.value);
  const onSubmit = () => verifyPasswordFn(password);

  return (
    <div className={`${theme.prefixClass}-asking-password`}>
      <div>
        <div className={`${theme.prefixClass}-asking-password-message`}>
          {l10n.core.askingPassword.requirePasswordToOpen}:
        </div>
        <div className={`${theme.prefixClass}-asking-password-input-container`}>
          <input
            className={`${theme.prefixClass}-asking-password-input`}
            type="password"
            onChange={onChangePassword}
          />
          <button
            className={`${theme.prefixClass}-asking-password-button`}
            onClick={onSubmit}
          >
            {l10n.core.askingPassword.submit}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskingPassword;
