const express = require('express')
const router = express.Router()
const Url = require('../models/Url')

const { nanoid } = require('nanoid')

router.post('/shorten', async (req, res) => {
    console.log(req.body)
    const originalUrl = req.body.originalUrl;
    const urlCode = nanoid(10);
    try {
        let url = await Url.findOne({ originalUrl })

        if(url) {
            res.json(url.shortUrl)
        } else {
            const shortUrl = `${process.env.BASE_URL}/${urlCode}`
            url = new Url({
                originalUrl,
                shortUrl,
                urlCode,
                date: new Date()
            })

            await url.save()
            res.json(url.shortUrl)
        }
    }catch (err) {
        console.error(err)
        res.status(500).json('Server error')
    }
}
)




module.exports = router