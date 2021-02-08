import styled from 'styled-components/macro';

const PrimaryButtonElement = styled.button`
  padding: 8px;
  color: rgb(255, 255, 255);
  background-color: rgb(53, 126, 221);
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const PrimaryButton = ({ children, onClick }) => {
  return (
    <PrimaryButtonElement onClick={onClick}>{children}</PrimaryButtonElement>
  );
};

export default PrimaryButton;
