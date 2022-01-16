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

exports.edit = async (req, res) => {
    const id = req.params.id;
    try{
        const game = await Games.findById(id);
        res.render('update-game', { game: game, id: id});
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
        res.redirect('/allgames/?message=game has been updated');
    } catch (e) {
        res.status(404).send({
            message: `could not find game ${id}`
        });
    }
};

exports.editrating = async (req, res) => {
    const id = req.params.id;
    try{
        const game = await Games.findById(id);
        res.render('update-rating', { game: game, id: id});
    } catch (e) {
        res.status(404).send({
            message: `could not find game ${id}`
        });
    }
};

exports.updaterating = async (req, res) => {
    const id = req.params.id;
    try{
        const game = await Games.updateOne({ _id: id}, req.body);
        res.redirect('/gameratings/?message=game has been updated');
    } catch (e) {
        res.status(404).send({
            message: `could not find game ${id}`
        });
    }
};

exports.create = async (req, res) => {

    try {
      const game = new Games({ 
          title: req.body.title,
          platform: req.body.platform,
          genre: req.body.genre,
          release_date: req.body.release_date,
          online_features: req.body.online_features,
          played: req.body.played,
          rating: req.body.rating
        });
      await game.save();
      res.redirect('/allgames/?message=The game has been added')
    } catch (e) {
      if (e.errors) {
        console.log(e.errors);
        res.render('create-game', { errors: e.errors })
        return;
      }
      return res.status(400).send({
        message: JSON.parse(e),
      });
    }
  };