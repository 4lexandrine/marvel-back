const express = require("express");
const axios = require("axios");
const router = express.Router();
const md5 = require('md5');
const uid2 = require("uid2");

// const Character = require("../Models/Character");

const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_SECRET_KEY
const ts = uid2(10);
const toHash = ts + privateKey + publicKey;
const hash = md5(toHash);
// console.log(ts, hash, publicKey);

router.get("/characters", async (req, res) => {
    try {
        const offset = req.query.offset;
        const search = req.query.nameStartsWith;

        if (!search) {
            const url = `http://gateway.marvel.com/v1/public/characters?limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}`;
            const response = await axios.get(url);
            const data = response.data.data;
            res.json(data);
        } else {
            const urlChar = `https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&nameStartsWith=${search}`;
            const response = await axios.get(urlChar);
            const data = response.data.data;
            res.json(data);
        }

        // const newCharacter = new Character({
        //     id: data.id,
        //     name: data.name,
        //     thumbnail: data.thumbnail.path,
        //     description: data.description
        // });

        // await newCharacter.save();

        // res.json({
        //     id: newCharacter.id,
        //     name: newCharacter.name,
        //     thumbnail: newCharacter.thumbnail,
        //     description: newCharacter.description
        // });

    } catch (error) {
        res.json(error);
    }
})

router.get("/characters/character/:id?", async (req, res) => {
    try {
        const idSearch = await Characters.findById(req.params.id);
        res.json(idSearch);
    } catch (error) {
        res.json({ error: error.message });
    }
})

router.get("/comics", async (req, res) => {
    try {
        const offset = req.query.offset;
        const search = req.query.nameStartsWith;

        if (!search) {
            const url = `http://gateway.marvel.com/v1/public/comics?limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}`;
            const response = await axios.get(url);
            const data = response.data.data;
            res.json(data);
        } else {
            const urlComics = `https://gateway.marvel.com:443/v1/public/comics?limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&nameStartsWith=${search}`;
            const response = await axios.get(urlComics);
            const data = response.data.data;
            res.json(data);
        }
    } catch (error) {
        res.json({ error: error.message });
    }

})


module.exports = router;

