const express = require('express')
const connectDB = require('./database')
const cors = require('cors')
const Url = require('./models/Url')

const urlRoutes = require('./routes/urls')

const app = express();

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/url', urlRoutes)

app.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code })
        if(url) {
            return res.redirect(url.originalUrl)
        }else {
            return res.status(404).json('No URL found')
        }
    }catch (err) {
        console.error(err)
        res.status(500).json('Server error')
    }
})

app.get('/', (req, res) => {
    res.render('index')
})

const PORT = process.env.PORT || 5001

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))