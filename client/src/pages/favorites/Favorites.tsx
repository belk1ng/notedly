import { useDocumentTitle } from "@/hooks";
import { Typography } from "@/components";

const Favorites = () => {
  useDocumentTitle("Favorite");

  return <Typography variant={"heading-2"}>Favorites</Typography>;
};

export default Favorites;
