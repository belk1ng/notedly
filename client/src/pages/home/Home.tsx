import { useDocumentTitle } from "@/hooks";
import { NotesNavigation, QueryResult, Typography } from "@/components";
import { StyledHomeContainer } from "./styled";
import { useNotesFeedQuery } from "@/__generated__/types";

const Home = () => {
  useDocumentTitle("Home");

  const { loading, error, data } = useNotesFeedQuery({
    variables: {
      cursor: "",
    },
  });

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <StyledHomeContainer>
        <NotesNavigation notes={data?.notesFeed?.notes ?? []} />

        <section>
          <Typography component={"h3"} variant={"heading-2"}>
            Home
          </Typography>
        </section>
      </StyledHomeContainer>
    </QueryResult>
  );
};

export default Home;
