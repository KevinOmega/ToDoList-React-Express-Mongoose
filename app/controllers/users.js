const mongoose = require("mongoose");
const User = mongoose.model("User");
const Todo = mongoose.model("Todo");

exports.register = function (req, res, passport) {
  User.register(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    req.body.password,
    function (err) {
      if (err) {
        res.json({ error: err });
      } else {
        passport.authenticate("local")(req, res, function () {
          res.json({ message: "success" });
        });
      }
    }
  );
};

exports.login = function (req, res, passport) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      res.json({ error: err });
    } else {
      passport.authenticate("local")(req, res, function () {
        res.json({ message: "success" });
      });
    }
  });
};

exports.logout = function (req, res) {
  req.logout((err) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.redirect("/login");
    }
  });
};

exports.add = function (req, res) {
  const id = req.body.userID;
  const text = req.body.input;

  const newTodo = new Todo({
    text,
    checked: false,
  });

  User.findById(id, (err, userFound) => {
    if (!err) {
      userFound.list.push(newTodo);
      userFound.save();
      res.json(userFound.list);
    }
  });
};

exports.getList = function (req, res) {
  User.findById(req.body.userID, (err, userFound) => {
    if (!err) {
      res.json({ list: userFound.list, username: userFound.username });
    }
  });
};

exports.removeItem = function (req, res) {
  const itemID = req.body.itemID;
  User.findByIdAndUpdate(
    req.body.userID,
    { $pull: { list: { _id: mongoose.mongo.ObjectId(itemID) } } },
    (err, userFound) => {
      if (!err) {
        res.json(userFound.list);
      }
    }
  );
};

exports.checkItem = function (req, res) {
  User.findById(req.body.userID, (err, userFound) => {
    if (!err) {
      const index = userFound.list.findIndex(
        (item) => String(item._id) === req.body.itemID
      );
      userFound.list[index] = {
        ...userFound.list[index],
        checked: !userFound.list[index].checked,
      };
      userFound.save();
      res.json(userFound.list);
    }
  });
};
