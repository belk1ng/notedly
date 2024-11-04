import styled from "styled-components";

interface Props {
  $withGutters?: boolean;
}

export const Container = styled.div<Props>`
  height: 100%;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;

  padding-block: ${(props) => (props.$withGutters ? "100px" : 0)};
`;
