import { useState, useEffect } from "react";
import type { MouseEvent } from "react";
import { StyledRipple, StyledRippleElement } from "./styled";

interface RippleValues {
  x: number;
  y: number;
  id: number;
  size: number;
}

interface RippleProps {
  duration?: number;
}

export const Ripple = ({ duration = 900 }: RippleProps) => {
  const [ripples, setRipples] = useState<RippleValues[]>([]);

  useEffect(() => {
    let bounce: NodeJS.Timeout | undefined;

    if (ripples.length > 0) {
      bounce && clearTimeout(bounce);

      bounce = setTimeout(() => {
        setRipples([]);
        clearTimeout(bounce);
      }, duration * 4);
    }

    return () => clearTimeout(bounce);
  }, [ripples, duration]);

  const addRipple = (event: MouseEvent<HTMLDivElement>) => {
    const container = event.currentTarget.getBoundingClientRect();
    const size =
      container.width > container.height ? container.width : container.height;

    const x = event.pageX - container.x - container.width / 2;
    const y = event.pageY - container.y - container.width / 2;
    const id = Date.now();
    const newRipple = {
      x,
      y,
      size,
      id,
    };

    setRipples((prev) => [...prev, newRipple]);
  };

  return (
    <StyledRipple onMouseDown={addRipple}>
      {ripples.map((ripple) => (
        <StyledRippleElement
          key={ripple.id}
          style={{
            animationDuration: `${duration / 1000}s`,
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </StyledRipple>
  );
};
