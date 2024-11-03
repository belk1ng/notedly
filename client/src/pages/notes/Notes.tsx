import { useDocumentTitle } from "@/hooks";
import { Typography } from "@/components";

const Notes = () => {
  useDocumentTitle("Notes");

  return <Typography variant={"heading-2"}>Notes</Typography>;
};

export default Notes;
