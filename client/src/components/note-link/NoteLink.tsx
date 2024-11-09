import {
  StyledNoteLinkContainer,
  StyledNoteLinkTitle,
  StyledNoteLinkText,
} from "./styled";

export interface StyledNoteLinkProps {
  $active?: boolean;
}

export interface NoteLinkProps {
  note: any;
  active?: boolean;
}

export const NoteLink = ({ note, active = false }: NoteLinkProps) => {
  return (
    <StyledNoteLinkContainer $active={active}>
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
