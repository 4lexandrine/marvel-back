const express = require("express");
const axios = require("axios");
const router = express.Router();
const md5 = require('md5');
const uid2 = require("uid2");

// API Athorization
const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_SECRET_KEY
const ts = uid2(10);
const toHash = ts + privateKey + publicKey;
const hash = md5(toHash);
// console.log(ts, hash, publicKey);

const urlAPI = "http://gateway.marvel.com/v1/public/characters";

router.get("/characters", async (req, res) => {
    try {
        const offset = req.query.offset || 0;
        const limit = req.query.limit
        const search = req.query.nameStartsWith;

        if (!search) {
            const url = `${urlAPI}?limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}`;
            const response = await axios.get(url);
            const data = response.data.data;
            res.json(data);
        } else {
            const urlChar = `${urlAPI}?limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&nameStartsWith=${search}`;
            const response = await axios.get(urlChar);
            const data = response.data.data;
            res.json(data);
        }

    } catch (error) {
        res.json(error);
    }
})

router.get("/characters/:id/comics", async (req, res) => {
    try {
        const id = req.params.id;
        const limit = req.query.limit;

        const url = `${urlAPI}/${id}/comics?orderBy=title&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        const response = await axios.get(url);
        const data = response.data.data;
        res.json(data);
    } catch (error) {
        res.json(error);
    }
})


module.exports = router;

