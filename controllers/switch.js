const Games = require("../models/Game");
const bodyParser = require("body-parser");

exports.list = async (req, res) => {
    try {
        console.log(req.query)
        const message = req.query.message;
        const games = await Games.find({platform: "Nintendo Switch"});
        res.render("nintendoSwitch", { games: games, message: message });
    } catch (e) {
        res.status(404).send({ message: "could not list games"});
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try{
        await Games.findByIdAndRemove(id);
        res.redirect("/nintendoSwitch");
    } catch (e) {
        res.status(404).send({
            message: `could not delete record ${id}.`
        });
    }
};

exports.edit = async (req, res) => {
    const id = req.params.id;
    try{
        const game = await Games.findById(id);
        res.render('update-game-platform-specific', { game: game, id: id});
    } catch (e) {
        res.status(404).send({
            message: `could not find game ${id}`
        });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    try{
        const game = await Games.updateOne({ _id: id}, req.body);
        res.redirect('/nintendoSwitch/?message=game has been updated');
    } catch (e) {
        res.status(404).send({
            message: `could not find game ${id}`
        });
    }
};