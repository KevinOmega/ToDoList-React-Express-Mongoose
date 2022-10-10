const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  checked: Boolean,
});

mongoose.model("Todo", TodoSchema);
