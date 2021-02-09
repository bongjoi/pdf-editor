import { useContext, useState } from 'react';
import styled from 'styled-components/macro';
import ThemeContext from '../theme/ThemeContext';
import LocalizationContext from '../localization/LocalizationContext';

const Div = styled.div`
  .editor-asking-password {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.3);

    &-message {
      margin: 8px 0px;
    }

    &-input-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-input {
      padding: 8px;
      width: 200px;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }

    &-button {
      padding: 8px 16px;
      color: rgb(255, 255, 255);
      background-color: rgb(53, 126, 221);
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-left-color: transparent;
      cursor: pointer;
    }
  }
`;

const AskingPassword = ({ verifyPasswordFn }) => {
  const l10n = useContext(LocalizationContext);
  const theme = useContext(ThemeContext);
  const [password, setPassword] = useState('');

  const changePassword = (event) => setPassword(event.target.value);
  const submit = () => verifyPasswordFn(password);

  return (
    <Div className={`${theme.prefixClass}-asking-password`}>
      <div>
        <div className={`${theme.prefixClass}-asking-password-message`}>
          {l10n.core.askingPassword.requirePasswordToOpen}:
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
            {l10n.core.askingPassword.submit}
          </button>
        </div>
      </div>
    </Div>
  );
};

export default AskingPassword;
