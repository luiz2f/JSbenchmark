import styled, { css } from "styled-components";
const sizes = {
  small: css`
    font-size: 14px;
    padding: 8px 16px;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 16px;
    padding: 12px 24px;
    font-weight: 600;
  `,
  large: css`
    font-size: 18px;
    padding: 16px 32px;
    font-weight: 600;
  `,
};
const variations = {
  primary: css`
    color: #fff;
    background-color: #0a36b0;

    &:hover {
      background-color: #005fff;
    }
  `,
  primarylight: css`
    border: 1px solid #0a36b0;
    color: #0a36b0;
    background-color: #fff;

    &:hover {
      background-color: #dfebff;
      border: 1px solid #005fff;
      color: #005fff;
    }
  `,
  secondary: css`
    color: #333;
    background-color: #f8fafc;
    border: 1px solid #aeaeae;
    &:hover {
      background-color: #f1f5f9;
    }
  `,
  danger: css`
    color: #fff;
    background-color: #cc2929;

    &:hover {
      background-color: #c95454;
    }
  `,
  dangerlight: css`
    border: 1px solid #c95454;
    color: #c95454;
    background-color: #fff;

    &:hover {
      background-color: #ffe0e0;
      border: 1px solid #cc2929;
      color: #cc2929;
    }
  `,
};

export const Button = styled.button`
  border: none;
  color: #fff;
  background-color: #0a36b0;
  font-size: 16px;

  border-radius: 10px;
  padding: 12px 24px;
  transition: all 150ms;
  cursor: pointer;

  &:hover {
    background-color: #005fff;
  }
  &:active {
    background-color: #0a36b0;
  }
  ${(props) => variations[props.type]}
  ${(props) => sizes[props.size]}

  ${(props) =>
    props.$widthohp === "true" &&
    `
    width: 100%;
  `}
    ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
      background-color: #e7e7e7;
      color: #888;
      &:hover {
        background-color: #a1a1a1;
      }
      &:active {
        background-color: #a1a1a1;
      }
    `}
`;
Button.defaultProps = {
  type: "primary",
  sizes: "medium",
  $widthohp: "false",
};
