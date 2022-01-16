require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const User = require("./models/User");



/**
 * Controllers (route handlers).
 */
const gameController = require("./controllers/game")
const gameRatingController = require("./controllers/rating")
const nintendoSwitchController = require("./controllers/switch")
const playstationController = require("./controllers/ps")
const playstationVitaController = require("./controllers/vita")
const xboxController = require("./controllers/xbox")
const nintendo3DSController = require("./controllers/3DS")
const nintendowiiuController = require("./controllers/wiiu")
const userController = require("./controllers/user")


const homeController = require("./controllers/home");

const Game = require("./models/Game");

const app = express();
app.set("view engine", "ejs");

/**
 * notice above we are using dotenv. We can now pull the values from our environment
 */

const { PORT, MONGODB_URI } = process.env;

/**
 * connect to database
 */




mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

/***
 * We are applying our middlewear
 */
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))


app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}

app.get("/", homeController.list);


app.get("/allgames", gameController.list);
app.get("/allgames/delete/:id", gameController.delete);
app.get("/allgames/update/:id", gameController.edit);
app.post("/allgames/update/:id", gameController.update);

app.get("/gameratings", gameRatingController.list);
app.get("/gameratings/update/:id", gameController.editrating);
app.post("/gameratings/update/:id", gameController.updaterating);

app.get("/nintendoswitch", nintendoSwitchController.list);
app.get("/nintendoswitch/delete/:id", nintendoSwitchController.delete);
app.get("/nintendoswitch/update/:id", nintendoSwitchController.edit);
app.post("/nintendoswitch/update/:id", nintendoSwitchController.update);

app.get("/playstation", playstationController.list);
app.get("/playstation/delete/:id", playstationController.delete);
app.get("/playstation/update/:id", playstationController.edit);
app.post("/playstation/update/:id", playstationController.update);

app.get("/psVita", playstationVitaController.list);
app.get("/psVita/delete/:id", playstationVitaController.delete);
app.get("/psVita/update/:id", playstationVitaController.edit);
app.post("/psVita/update/:id", playstationVitaController.update);

app.get("/Xbox", xboxController.list);
app.get("/Xbox/delete/:id", xboxController.delete);
app.get("/Xbox/update/:id", xboxController.edit);
app.post("/Xbox/update/:id", xboxController.update);

app.get("/Nintendo3DS", nintendo3DSController.list);
app.get("/Nintendo3DS/delete/:id", nintendo3DSController.delete);
app.get("/Nintendo3DS/update/:id", nintendo3DSController.edit);
app.post("/Nintendo3DS/update/:id", nintendo3DSController.update);

app.get("/NintendoWiiU", nintendowiiuController.list);
app.get("/NintendoWiiU/delete/:id", nintendowiiuController.delete);
app.get("/NintendoWiiU/update/:id", nintendowiiuController.edit);
app.post("/NintendoWiiU/update/:id", nintendowiiuController.update);

app.get("/register", (req, res) => {
  res.render('register', { errors: {} })
});
app.post("/register", userController.create);

app.get("/login", (req, res) => {
  res.render('login', { errors: {} })
});
app.post("/login", userController.login);

app.get("/create-game", authMiddleware, (req, res) => {
  res.render("create-game", { errors: {} });
});
app.post("/create-game", gameController.create);

app.listen(PORT, () => {
  console.log(
    `Example app listening at http://localhost:${PORT}`,
    chalk.green("✓")
  );
});
