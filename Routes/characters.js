const express = require("express");
const axios = require("axios");
const router = express.Router();
const md5 = require('md5');
const uid2 = require("uid2");

const Character = require("../Models/Character");

const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_SECRET_KEY
const ts = uid2(10);
const toHash = ts + privateKey + publicKey;
const hash = md5(toHash);
const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
console.log(ts, hash, publicKey);

router.get("/characters", async (req, res) => {
    try {
        const response = await axios.get(url);
        // console.log(response.data.data);
        const data = response.data.data;
        res.json(data);
        // const newCharacter = new Character({
        //     name: data.name,
        //     thumbnail: data.thumbnail.path,
        //     description: data.description
        // })
        // await newCharacter.save();
        // res.json({
        //     id: newCharacter._id,
        //     name: newCharacter.name,
        //     thumbnail: newCharacter.thumbnail,
        //     description: newCharacter.description
        // });
    } catch (error) {
        res.json(error);
    }
})

module.exports = router;

