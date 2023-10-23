const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  text: { type: String, required: true, maxLength: 100 }
});

// Export model
module.exports = mongoose.model("Note", NoteSchema);