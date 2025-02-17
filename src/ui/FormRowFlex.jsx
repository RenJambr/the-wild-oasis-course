import styled from "styled-components";

const FormRowFlex = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 1.2rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  & > :first-child,
  :last-child {
    padding-top: 0;
    padding-bottom: 0;
    border-bottom: 0;
  }
`;

export default FormRowFlex;
