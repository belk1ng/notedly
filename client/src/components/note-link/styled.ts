import styled from "styled-components";
import { Typography } from "@/components";
import { StyledNoteLinkProps } from "./NoteLink";

export const StyledNoteLinkContainer = styled.article<StyledNoteLinkProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  width: 100%;
  padding: 10px 16px;

  border-radius: 8px;
  cursor: pointer;

  background-color: ${(props) =>
    props.$active ? props.theme.colors.neutral["gray-3"] : "transparent"};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral["gray-4"]};
  }
`;

export const StyledNoteLinkTitle = styled(Typography)`
  color: ${({ theme }) => theme.colors.neutral.primary};
`;

export const StyledNoteLinkText = styled(Typography)`
  color: ${({ theme }) => theme.colors.neutral["gray-2"]};
`;
