const Games = require("../models/Game");
const bodyParser = require("body-parser");

exports.list = async (req, res) => {
    try {
        console.log(req.query)
        const message = req.query.message;
        const games = await Games.find({});
        res.render("gameratings", { games: games, message: message });
    } catch (e) {
        res.status(404).send({ message: "could not list games"});
    }
};