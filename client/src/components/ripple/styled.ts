import styled from "styled-components";

export const StyledRipple = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  :has(&) {
    position: relative;
    overflow: hidden;
  }
`;

export const StyledRippleElement = styled.div`
  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }

  transform: scale(0);
  border-radius: 100%;
  position: absolute;
  opacity: 0.25;
  background-color: currentColor;
  animation-name: ripple;
`;
