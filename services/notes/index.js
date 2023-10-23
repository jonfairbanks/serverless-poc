const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

const mongo_uri = process.env['MONGO_CONNECTION_STRING']
// CREATE
module.exports.add_note = async (event) => {

  // add note to database

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: "Got note!",
      mongo_uri: mongo_uri,
      input: event,
    }),
  };
};

// READ
module.exports.get_notes = async (event) => {

  // get all notes from db

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: "Here are your notes!!",
      debug: event,
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
