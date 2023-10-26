import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import EditNote from '@mui/icons-material/EditNote';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AddNote from '../components/AddNote';
import NotesList from '../components/NotesList';
import { useState, useEffect } from 'react';

const apiDomain = window.REACT_APP_API_DOMAIN

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Made with ❤️ in '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const NotesView = () => {

  const [loading, setLoading] = useState(false)
  const [notes, setNotes] = useState([])

  async function addNote(note) {
    setLoading(true)
    fetch(`https://${apiDomain}/notes`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        text: note
      })
    })
    .then(response => response.json())
    .then( data => {
      console.log(data)
      setLoading(false)
      fetchNotes()
    }).catch (error => {
      console.log(error)
      setLoading(false)
    })
  }

  async function deleteNote(id) {
    setLoading(true)
    fetch(`https://${apiDomain}/notes/${id}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "DELETE"
    })
    .then(response => response.json())
    .then( data => {
      console.log(data)
      setLoading(false)
      fetchNotes()
    }).catch (error => {
      console.log(error)
      setLoading(false)
    })
  }

  const fetchNotes = () => {
    setLoading(true)
    fetch(`https://${apiDomain}/notes`)
    .then(response => response.json())
    .then( data => {
      console.log(data)
      setNotes(data.notes)
      setLoading(false)
    }).catch (error => {
      console.log(error)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <EditNote />
        </Avatar>
        <Typography component="h1" variant="h5">
          Notes
        </Typography>
        <AddNote addNote={addNote}/>
        <NotesList notes={notes} deleteNote={deleteNote}/>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>

  );
}

export default NotesView