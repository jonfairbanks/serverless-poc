const mongoose = require('./db')
const Note = require('./models/note')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

// CREATE
module.exports.add_note = async (event) => {

  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect();

  // insert note to database
  const note = await Note.create({
      text: body?.text || "test note text"
  })

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

  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect();

  // get all notes
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
  await mongoose.connect();
  const note = await Note.findById(note_id)

  // find note in database

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `here is your note: ${note_id}`,
      note: note,
      input: event,
    }),
  };
};

// UPDATE
module.exports.update_note = async (event) => {

  // get note id from url path
  const note_id = event.pathParameters.note_id

  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect();

  // update note in database
  const note = await Note.findByIdAndUpdate( note_id, {
      text: body?.text
  }, {new: true})

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `Note with id ${note_id} has been updated`,
      note: note,
      input: event,
    }),
  };
};

// DESTROY
module.exports.delete_note = async (event) => {

  // get note id from url path
  const note_id = event.pathParameters.note_id

  // connect to database
  await mongoose.connect();

  // update note in database
  const note = await Note.findByIdAndDelete( note_id)

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `note ${note_id} has been deleted`,
      note: note,
      input: event,
    }),
  };
};
