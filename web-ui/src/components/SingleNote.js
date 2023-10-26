import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Divider from '@mui/material/Divider';


const SingleNote = (props) => {
  const { note, deleteNote } = props

  return (
    <>
      <ListItem>
        <ListItemText primary={note.text}  />
        <ListItemAvatar onClick={()=>{deleteNote(note._id)}}>
          <Avatar>
            <DeleteForever />
          </Avatar>
        </ListItemAvatar>
      </ListItem>
      <Divider  component="li" />
    </>
  );
}

export default SingleNote;
