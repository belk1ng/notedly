import styled from "styled-components";

export const StyledNotesNavigationContainer = styled.aside`
  height: 100%;
  padding: 40px 13px;
  border-right: 1px solid ${(props) => props.theme.colors.neutral["gray-3"]};
  overflow: auto;
`;

export const StyledNotesNavigationBar = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
