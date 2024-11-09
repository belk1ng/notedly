import { NoteLink, Button } from "@/components";
import {
  StyledNotesNavigationBar,
  StyledNotesNavigationContainer,
} from "./styled";
import { NavigationNoteFragment } from "@/__generated__/types";

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
          <li>
            {notes.map((note) => (
              <NoteLink key={note.id} note={note} />
            ))}
          </li>
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
