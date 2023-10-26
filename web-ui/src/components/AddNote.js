
import { useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const AddNote = (props) => {
   const  {addNote} = props
   const [note, setNote] = useState('')

   const handleSubmit = (event) => {
        event.preventDefault();
        addNote(note)
        setNote('')
    };
    const handleChange = (event) => {
        setNote(event.currentTarget.value)
    }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1,width: '100%', }}>
        <TextField
            margin="normal"
            fullWidth
            id="note"
            label="Note"
            name="note"
            autoComplete="note"
            autoFocus
            value={note}
            onChange={(e)=>{handleChange(e)}}
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
        >
            Add Note
        </Button>
        
    </Box>
  );
}

export default AddNote;
