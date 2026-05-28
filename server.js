const express = require('express')

const app = express()

const fs = require('fs')

const path = require('path')


app.use(express.json())

app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'index.html')
    )

})


app.post('/beacon', async (req, res) => {

    console.log('Beacon recibido')

    if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs')
    }

    const payload = {

        timestamp: new Date().toISOString(),

        ip:
            req.headers['x-forwarded-for']
            || req.socket.remoteAddress,

        headers: {
            userAgent: req.headers['user-agent'],
            referer: req.headers['referer']
        },

        body: req.body
    }

    console.log(
        JSON.stringify(payload, null, 2)
    )

    console.log('Log guardado')

    res.sendStatus(204)
})

app.listen(3000, () => {
    console.log('Servidor activo')
})