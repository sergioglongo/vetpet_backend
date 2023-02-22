const { Router } = require('express');

const { Vaccine } = require('../db');

const router = Router();

router.get("/all", async (req, res, next) => {
    try {
        await Vaccine.findAll()
        .then(result => res.status(200).json(result))
        .catch(error => res.json(error))
    } catch (error) {
        res.status(400).send({error: error.message})     
    }
})