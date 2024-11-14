import { useParams, Link } from "react-router-dom";
import {
  StyledNoteLinkContainer,
  StyledNoteLinkText,
  StyledNoteLinkTitle,
} from "./styled";
import { NavigationNoteFragment } from "@/apollo/generated/types";

export interface StyledNoteLinkProps {
  $active?: boolean;
}

export interface NoteLinkProps {
  note: NavigationNoteFragment;
}

export const NoteLink = ({ note }: NoteLinkProps) => {
  const params = useParams();

  const isActive = params?.noteId === note.id;

  return (
    <StyledNoteLinkContainer
      to={`/home/${note.id}`}
      $active={isActive}
      as={Link}
    >
      <StyledNoteLinkTitle component={"h2"} variant={"body-large"}>
        Mocked title
      </StyledNoteLinkTitle>

      <StyledNoteLinkText component={"p"} variant={"body-small"}>
        {note.content}
      </StyledNoteLinkText>

      <StyledNoteLinkText
        component={"time"}
        dateTime={note.createdAt}
        variant={"body-small"}
        style={{ marginTop: 10 }}
      >
        {new Date(note.createdAt).toDateString()}
      </StyledNoteLinkText>
    </StyledNoteLinkContainer>
  );
};
