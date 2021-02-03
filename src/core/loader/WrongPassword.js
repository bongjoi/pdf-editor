import { useState, useContext } from 'react';
import LocalizationContext from '../localization/LocalizationContext';
import ThemeContext from '../theme/ThemeContext';

const WrongPassword = ({ verifypasswordFn }) => {
  const l10n = useContext(LocalizationContext);
  const theme = useContext(ThemeContext);
  const [password, setPassword] = useState('');

  const onChangePassword = (event) => setPassword(event.target.value);
  const onSubmit = () => verifypasswordFn(password);

  return (
    <div className={`${theme.prefixClass}-asking-password`}>
      <div>
        <div className={`${theme.prefixClass}-asking-password-message`}>
          {l10n.core.wrongPassword.tryAgain}:
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
            {l10n.core.wrongPassword.submit}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WrongPassword;
