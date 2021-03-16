const http = require('http')

const db = require('./models')
const utils = require('./utils')

const handleWebhook = (req, res) => {

    switch (req.method) {

        case 'POST': {

            let data = ''

            req.on('data', (chunk) => {

                data += chunk

            })

            req.on('end', () => {

                const hook = JSON.parse(data[0].objectId)

                const contact = utils.getContactById(data)

                console.log(contact)

            })

            res.write("ok")
            res.end()
            break

        }
        default: {
            res.writeHead(405)
            res.write("Error 403\nMethod not allowed!")
            res.end()
        }

    }

}

const server = http.createServer((req, res) => {

    switch (req.url) {

        case '/webhook': handleWebhook(req, res); break
        default: {
            res.writeHead(404)
            res.write("Error 404\nPage not found!")
            res.end()
        }

    }

})

server.listen(3000)
