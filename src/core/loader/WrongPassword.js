import { useContext, useState } from 'react';
import LocalizationContext from '../localization/LocalizationContext';
import ThemeContext from '../theme/ThemeContext';

const WrongPassword = ({ verifyPasswordFn }) => {
  const l10n = useContext(LocalizationContext);
  const theme = useContext(ThemeContext);
  const [password, setPassword] = useState('');

  const changePassword = (event) => setPassword(event.target.value);
  const submit = () => verifyPasswordFn(password);

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
            onChange={changePassword}
          />
          <button
            className={`${theme.prefixClass}-asking-password-button`}
            onClick={submit}
          >
            {l10n.core.wrongPassword.submit}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WrongPassword;
