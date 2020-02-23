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

const urlAPI = "http://gateway.marvel.com/v1/public/comics"

router.get("/comics", async (req, res) => {
    try {
        const offset = req.query.offset || 0;
        const limit = req.query.limit;
        const search = req.query.nameStartsWith;

        if (!search) {
            const url = `${urlAPI}?limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&orderBy=title`;
            const response = await axios.get(url);
            console.log(url);

            const data = response.data.data;
            res.json(data);
        } else {
            const url = `${urlAPI}?limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&nameStartsWith=${search}&orderBy=title`;

            const response = await axios.get(url);
            const data = response.data.data;
            res.json(data);
        }
    } catch (error) {
        res.json({ error: error.message });
    }

})

module.exports = router;

