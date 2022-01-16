const Games = require("../models/Game");
const bodyParser = require("body-parser");
const req = require("express/lib/request");

exports.list = async (req, res) => {
    try {
        console.log(req.query)
        const message = req.query.message;
        const games = await Games.find({});
        res.render("allgames", { games: games, message: message });
    } catch (e) {
        res.status(404).send({ message: "could not list games"});
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try{
        await Games.findByIdAndRemove(id);
        res.redirect("/allgames");
    } catch (e) {
        res.status(404).send({
            message: `could not delete record ${id}.`
        });
    }
};