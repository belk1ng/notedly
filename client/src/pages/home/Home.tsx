import { useDocumentTitle } from "@/hooks";
import { Typography } from "@/components";

const Home = () => {
  useDocumentTitle("Home");

  return <Typography variant={"heading-2"}>Home</Typography>;
};

export default Home;
