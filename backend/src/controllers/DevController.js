const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnection, sendMessage } = require('../websocket');

// index, show, store, update, destroy

module.exports = {

    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },

    async show(req, res) {

        const { github_username } = req.github_username;

        const dev = await Dev.findOne({
            github_username
        });
        
        return res.json(dev);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = response.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

            // Filtrar conexões que estão ha no maximo 10KM de distancia e que o novo deve possua ao menos uma das techs filtradas

            const sendSocketMessageTo = findConnection(
                {latitude, longitude}
                , techsArray
            );

            sendMessage(sendSocketMessageTo, 'new-dev', dev);

        }


        return res.json(dev);
    }
}