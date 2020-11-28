const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json('Hello, world!')
})

router.use((req, res) => {
    res.status(404)
    res.json({
        error: "Noir ? Tu ne trouve pas ton coton dans le champs de ton maître ?"
    })
})

module.exports = router;
