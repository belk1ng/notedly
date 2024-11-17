import styled, { css } from "styled-components";
import { Typography } from "@/components";
import { StyledInputProps } from "@/components/input/Input.tsx";

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const StyledInputLabel = styled.label`
  margin-bottom: 8px;
  color: ${(props) => props.theme.colors.neutral["gray-2"]};
`;

export const StyledInputControl = styled.input<StyledInputProps>`
  color: ${(props) => props.theme.colors.neutral.primary};
  background-color: ${(props) => props.theme.colors.neutral["gray-4"]};
  border: 1px solid ${(props) => props.theme.colors.neutral["gray-4"]};
  border-radius: 4px;
  font-size: 13px;
  padding: 8px 14px;

  &:not([disabled]) {
    &:hover,
    &:focus {
      border-color: ${(props) => props.theme.colors.neutral["gray-2"]};
      outline: none;
    }
  }

  ${(props) => {
    if (props.$hasError) {
      return css`
        border-color: ${props.theme.colors.service.error};
      `;
    }
  }}
`;

export const StyledInputError = styled(Typography)`
  color: ${(props) => props.theme.colors.service.error};
  margin-top: 4px;
`;
