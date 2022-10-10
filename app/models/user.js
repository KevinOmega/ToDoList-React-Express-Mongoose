const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const todo = require("./todo");
var findOrCreate = require("mongoose-findorcreate");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },

  list: {
    type: [todo.TodoSchema],
  },
  googleId: String,
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

mongoose.model("User", UserSchema);
