const req = require('express/lib/request');
const Games = require('../models/Game');

exports.list = async (req, res) => {
    console.log(req.session);
    try {

        const totalGames = await Games.find({}).count();
        const totalPlatforms = await Games.aggregate([
            { $group: { _id: "$platform", total: { $sum: 1}}},
            { $count: "total"}
        ])

        console.log(totalGames)
        
        res.render("index", {totalGames: totalGames, totalPlatforms: totalPlatforms[0].total});
    }catch (e) {
        console.log(e)
        res.status(404).send({
            message: 'error rendering page',
        });
    }
}