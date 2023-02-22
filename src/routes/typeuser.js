const { Router } = require('express');
const router = Router();
const { TypeUser } = require('../db');

router.get("/", async (req, res, next) => {
    try {
        await TypeUser.findAll()
        .then(result => res.status(200).json({success: true, result: result}))
        .catch(error => res.json({success: false, error: error.message}))
    } catch (error) {
        res.status(400).send({success: false, error: error.message})     
    }
})
