const serverRouter = require("../routes/server");
const users = require("../app/controllers/users");
const path = require("path");

module.exports = function (app, passport) {
  app.get("/server/auth", (req, res) => {
    let user = "";
    if (req.session.passport) {
      user = req.session.passport.user;
    }
    res.json({ auth: req.isAuthenticated(), user });
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
  );

  app.get(
    "/auth/google/todo",
    passport.authenticate("google", {
      failureRedirect: "/login",
    }),
    function (req, res) {
      // Successful authentication, redirect to secrets.
      res.redirect("/");
    }
  );

  app.post("/server/register", (req, res) => {
    users.register(req, res, passport);
  });

  app.get("/server/logout", users.logout);

  app.post("/server/login", (req, res) => {
    users.login(req, res, passport);
  });

  //List

  app.post("/server/getList", (req, res) => {
    users.getList(req, res);
  });

  app.post("/server/add", (req, res) => {
    users.add(req, res);
  });

  app.post("/server/delete", (req, res) => {
    users.removeItem(req, res);
  });

  app.post("/server/check", users.checkItem);

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
};
