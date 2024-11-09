import { gql, useQuery } from "@apollo/client";
import { useDocumentTitle } from "@/hooks";
import { NotesNavigation, Typography } from "@/components";
import { StyledHomeContainer } from "./styled";

const GET_NOTES = gql`
  query NotesFeed($cursor: String!) {
    notesFeed(cursor: $cursor) {
      notes {
        id
        createdAt
        content
        author {
          username
        }
      }
    }
  }
`;

const Home = () => {
  useDocumentTitle("Home");

  const { loading, error, data } = useQuery(GET_NOTES, {
    variables: {
      cursor: "",
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <StyledHomeContainer>
      <NotesNavigation notes={data.notesFeed.notes} />

      <section>
        <Typography component={"h3"} variant={"heading-2"}>
          Home
        </Typography>
      </section>
    </StyledHomeContainer>
  );
};

export default Home;
