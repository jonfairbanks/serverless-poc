import SingleNote from "./SingleNote";
import List from '@mui/material/List';

const NotesList = (props) => {
    const { notes, deleteNote } = props
    
    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
            }}
        >
  
            {notes.map((note, key)=>{
                return <SingleNote key={key} note={note} deleteNote={deleteNote}/>
            })}

      </List>
    );
  }
  
  export default NotesList;