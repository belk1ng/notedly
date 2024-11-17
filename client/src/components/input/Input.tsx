import { type ChangeEvent, type InputHTMLAttributes, useId } from "react";
import {
  StyledInputControl,
  StyledInputError,
  StyledInputLabel,
  StyledInputWrapper,
} from "./styled";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  errorMessage?: string;
}

export interface StyledInputProps {
  $hasError?: boolean;
}

export const Input = ({
  label,
  onChange: onChangeProp,
  errorMessage,
  required,
  ...props
}: InputProps) => {
  const id = useId();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChangeProp) {
      onChangeProp(event, event.target.value);
    }
  };

  return (
    <StyledInputWrapper>
      <StyledInputLabel htmlFor={id}>
        {label}{" "}
        {required && <StyledInputError component={"sup"}>*</StyledInputError>}
      </StyledInputLabel>

      <StyledInputControl
        {...props}
        id={id}
        onChange={onChange}
        $hasError={!!errorMessage}
      />

      {errorMessage && (
        <StyledInputError as={"p"} variant={"body-small"}>
          {errorMessage}
        </StyledInputError>
      )}
    </StyledInputWrapper>
  );
};
