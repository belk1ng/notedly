import {
  StyledNoteLinkContainer,
  StyledNoteLinkText,
  StyledNoteLinkTitle,
} from "./styled";
import { NavigationNoteFragment } from "@/__generated__/types";
import { useNavigate, useParams } from "react-router-dom";

export interface StyledNoteLinkProps {
  $active?: boolean;
}

export interface NoteLinkProps {
  note: NavigationNoteFragment;
}

export const NoteLink = ({ note }: NoteLinkProps) => {
  const navigate = useNavigate();

  const params = useParams();

  const onClick = () => {
    navigate(`/home/${note.id}`);
  };

  const isActive = params?.noteId === note.id;

  return (
    <StyledNoteLinkContainer $active={isActive} onClick={onClick}>
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
