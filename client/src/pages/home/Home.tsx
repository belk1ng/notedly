import { useDocumentTitle } from "@/hooks";
import { NotesNavigation, QueryResult, Typography } from "@/components";
import { StyledHomeContainer } from "./styled";
import { useNotesFeedQuery } from "@/__generated__/types";

const Home = () => {
  useDocumentTitle("Home");

  const { loading, error, data, fetchMore } = useNotesFeedQuery({
    variables: {
      cursor: "",
      limit: 5,
    },
  });

  const onLoadMore = () => {
    void fetchMore({
      variables: {
        cursor: data?.notesFeed.cursor,
      },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        return {
          notesFeed: {
            cursor: fetchMoreResult.notesFeed.cursor,
            hasNextPage: fetchMoreResult.notesFeed.hasNextPage,
            notes: [
              ...previousQueryResult.notesFeed.notes,
              ...fetchMoreResult.notesFeed.notes,
            ],
          },
        };
      },
    });
  };

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <StyledHomeContainer>
        <NotesNavigation
          notes={data?.notesFeed?.notes ?? []}
          onLoadMore={data?.notesFeed?.hasNextPage ? onLoadMore : undefined}
        />

        <section style={{ padding: "40px 13px" }}>
          <Typography component={"h3"} variant={"heading-2"}>
            Home
          </Typography>
        </section>
      </StyledHomeContainer>
    </QueryResult>
  );
};

export default Home;
