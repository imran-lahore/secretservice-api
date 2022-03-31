const express = require('express')
const router = express.Router();
const secrets = require('../models/secretserver')
router.get('/:hash', async (req, res) => {
    try{
        const findedSecret = await secrets.findOne({uuid: req.params.hash});
        res.status(200).json(findedSecret)
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
})

router.get('/', async (req, res) => {
    try{
        const findedSecret = await secrets.find();
        res.status(200).json(findedSecret)
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
})

router.post('/',async (req, res) => {
    try{
        const newsecret = new secrets({
            name: req.body.name,
            expireAfter : req.body.expireAfter
        })
        const savedSecret = await newsecret.save()
        res.status(200).json({
            description: "successful operation",
            schema: savedSecret
        });
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
})
module.exports = router;