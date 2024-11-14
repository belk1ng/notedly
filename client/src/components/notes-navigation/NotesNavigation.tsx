import { NoteLink, Button } from "@/components";
import {
  StyledNotesNavigationBar,
  StyledNotesNavigationContainer,
} from "./styled";
import { NavigationNoteFragment } from "@/apollo/generated/types";

export interface NotesNavigationProps {
  notes: NavigationNoteFragment[];
  onLoadMore?: VoidFunction;
}

export const NotesNavigation = ({
  notes,
  onLoadMore,
}: NotesNavigationProps) => {
  return (
    <StyledNotesNavigationContainer>
      <StyledNotesNavigationBar>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <NoteLink note={note} />
            </li>
          ))}
        </ul>

        {onLoadMore && (
          <Button fullWidth variant={"outlined"} onClick={onLoadMore}>
            Load more
          </Button>
        )}
      </StyledNotesNavigationBar>
    </StyledNotesNavigationContainer>
  );
};
