import './App.css';
import { useState } from 'react';

const apiDomain = window.REACT_APP_API_DOMAIN

const App = () => {

  const [loading, setLoading] = useState(false)
  const [responseText, setText] = useState('')
  const [note, setNote] = useState('')

  async function addNote(note) {
    setLoading(true)
    setText('')

    fetch(`https://${apiDomain}/notes`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        input: note
      })
    })
    .then(response => response.json())
    .then( data => {
      console.log(data)
      setText(data.message)
      setLoading(false)
    }).catch (error => {
      console.log(error)
      setLoading(false)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Type your note and click send
        </p>
        <button
          onClick={()=>{addNote(note)}}
          disabled={loading}
        >
          {loading? "Loading..": "Save note"}
        </button>
        <input value={note} onChange={(e)=>{setNote(e.target.value)}}/>
        <textarea value={responseText}/>
      </header>
    </div>
  );
}

export default App;
