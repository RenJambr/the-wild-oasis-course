import styled from "styled-components";

const StyledFormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2.4rem;
  width: 100%;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) input {
    width: 100%;
  }

  &:has(button) button {
    width: 100%;
  }
`;

const Label = styled.label`
  font-weight: 500;
  width: 100%;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  width: 100%;
`;

function FormRowVertical({ label, children, error }) {
  return (
    <StyledFormRowVertical>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRowVertical>
  );
}

export default FormRowVertical;
