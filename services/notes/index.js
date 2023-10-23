const mongoose = require('./db')
const Note = require('./models/note')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

// CREATE
module.exports.add_note = async (event) => {
  var body = JSON.parse(event.body)
  // connect to database
  await mongoose.connect();

  // insert note to database
  const note = new Note({
      text: body?.text || "test note text"
  })
  note.save()

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: "Got note!",
      note: note,
      input: event,
    }),
  };
};

// READ
module.exports.get_notes = async (event) => {

  await mongoose.connect();

  // insert note to database
  const notes = await Note.find()

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: "Here are your notes!!",
      notes: notes,
      input: event,
    }),
  };
};

module.exports.get_note_by_id = async (event) => {

  // get note id from url path
  const note_id = event.pathParameters.note_id

  // find note in database

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `here is your note: ${note_id}`,
      input: event,
    }),
  };
};

// UPDATE
module.exports.update_note = async (event) => {

  // get note id from url path
  const note_id = event.pathParameters.note_id

  // update note in database

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `Your updated note: ${note_id}`,
      input: event,
    }),
  };
};

// DESTROY
module.exports.delete_note = async (event) => {

  // get note id from url path
  const note_id = event.pathParameters.note_id

  // delete note from database

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `note ${note_id} has been deleted`,
      input: event,
    }),
  };
};
