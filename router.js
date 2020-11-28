const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/construction/index.html')
})

router.use((req, res) => {
    res.status(404)
    res.json({
        error: "Page non trouvée !"
    })
})

module.exports = router;
