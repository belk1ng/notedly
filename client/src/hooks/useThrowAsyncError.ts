import { useState } from "react";

export const useThrowAsyncError = () => {
  const [_, setState] = useState();

  return (error: Error) => {
    setState(() => {
      throw error;
    });
  };
};
