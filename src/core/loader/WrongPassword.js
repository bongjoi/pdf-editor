import { useState, useContext } from 'react';
import styled from 'styled-components/macro';
import LocalizationContext from '../localization/LocalizationContext';
import ThemeContext from '../theme/ThemeContext';

const AskingPasswordBlock = styled.div`
  &.editor-asking-password {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.3);
    &-message {
      margin: 8px 0px;
    }
    &-input-container {
      align-items: center;
      display: flex;
      justify-content: center;
    }
    &-input {
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 8px;
      width: 200px;
    }
    &-button {
      background-color: rgb(53, 126, 221);
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-left-color: transparent;
      color: rgb(255, 255, 255);
      cursor: pointer;
      padding: 8px 16px;
    }
  }
`;

const WrongPassword = ({ verifypasswordFn }) => {
  const l10n = useContext(LocalizationContext);
  const theme = useContext(ThemeContext);
  const [password, setPassword] = useState('');

  const onChangePassword = (event) => setPassword(event.target.value);
  const onSubmit = () => verifypasswordFn(password);

  return (
    <AskingPasswordBlock className={`${theme.prefixClass}-asking-password`}>
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
    </AskingPasswordBlock>
  );
};

export default WrongPassword;
