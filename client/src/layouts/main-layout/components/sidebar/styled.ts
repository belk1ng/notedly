import styled from "styled-components";

export const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 40px;

  padding: 40px 24px;
  background-color: ${(props) => props.theme.colors.neutral["gray-4"]};
  border-right: 1px solid ${(props) => props.theme.colors.neutral["gray-3"]};
`;

export const StyledAsideHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 10px;

  color: ${(props) => props.theme.colors.main.accent};
`;
