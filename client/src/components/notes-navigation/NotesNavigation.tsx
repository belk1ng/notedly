import { NoteLink, Button } from "@/components";
import {
  StyledNotesNavigationBar,
  StyledNotesNavigationContainer,
} from "./styled";
import type { NavigationNote } from "@/typings/note";

export interface NotesNavigationProps {
  notes: NavigationNote[];
}

export const NotesNavigation = ({ notes }: NotesNavigationProps) => {
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

        <Button fullWidth variant={"outlined"}>
          Load more
        </Button>
      </StyledNotesNavigationBar>
    </StyledNotesNavigationContainer>
  );
};
