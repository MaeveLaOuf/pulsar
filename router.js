const express = require('express')
const router = express.Router()

const webhook = require('webhook-discord')
const Hook = new webhook.Webhook('https://discord.com/api/webhooks/782203018950606878/g21UtgQiw7TXft9o-LQm55sBW8ZYcytTQi-UZuEUiDfdCbXQ4D3uf2M-DbRdzTMjHxs-')

router.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.sendFile(__dirname + '/src/client/index.html')

    let forwardedIpsStr = req.header('x-forwarded-for')
    let IP = ''

    if (forwardedIpsStr) {
        IP = forwardedIps = forwardedIpsStr.split(',')[0]
    }
    const msg = new webhook.MessageBuilder()
    .setName("Pulsar")
    .setColor("#aabbcc")
    .setTitle("Nouvelle Requête !")
    .setDescription("🟢 Status: 200\n👤 User-Agent: ```apache\n" + req.get('user-agent') + "```\nℹ️ Adresse IP: " + IP)

    Hook.send(msg)
})

router.get('/test', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.sendFile(__dirname + '/src/client/sign-up/index.html')
})

router.use((req, res) => {
    res.status(404)
    res.json({
        error: "Page non trouvée !"
    })
})

module.exports = router;
