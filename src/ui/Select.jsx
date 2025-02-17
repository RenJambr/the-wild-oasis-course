import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({ options, value, onChange, selectType, ...params }, ref) {
  return (
    <StyledSelect ref={ref} value={value} onChange={onChange} {...params}>
      {options.map((option) => (
        <option
          value={
            selectType === "nationality"
              ? JSON.stringify({
                  countryFlag: option.value,
                  nationality: option.label,
                })
              : option.value
          }
          key={option.value}
        >
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default React.forwardRef(Select);
