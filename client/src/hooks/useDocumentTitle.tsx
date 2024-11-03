import { useEffect } from "react";

export const useDocumentTitle = (prefix: string) => {
  useEffect(() => {
    if (prefix) {
      document.title = `${prefix} | Notedly`;
    }
  }, [prefix]);
};
