import { NoteLink, Button } from "@/components";
import {
  StyledNotesNavigationBar,
  StyledNotesNavigationContainer,
} from "./styled";
import type { NavigationNote } from "@/typings/note";

export interface NotesNavigationProps {
  notes: NavigationNote[];
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
