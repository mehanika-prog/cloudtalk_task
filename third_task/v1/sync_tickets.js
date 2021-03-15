const db = require('./models');

const utils = require('./utils')

const accessToken = process.argv[2]

if (process.argv.length !== 3) process.exit(1);

(async () => {

    const tickets = utils.getAllTickets(accessToken)

    const ticketIdsFromDb = await db.Ticket.findAll({attributes: ['id']})

    const ids = []

    for (const obj of ticketIdsFromDb) {

        ids.push(obj.dataValues.id)

    }

    let count = 0

    for (const ticket of tickets) {

        let ticketFromDb = await db.Ticket.findByPk(ticket.id)

        if (ticketFromDb) {

            if (!utils.ticketsMatches(ticket, ticketFromDb.dataValues)) {

                ticketFromDb.value = ticket.value
                ticketFromDb.timestamp = ticket.timestamp
                ticketFromDb.source = ticket.source
                ticketFromDb.sourceId = ticket.sourceId
                ticketFromDb.updatedByUserId = ticket.updatedByUserId

                ticketFromDb.save()

            }

            count++

        } else {

            db.Ticket.create({

                id: ticket.id,
                value: ticket.value,
                timestamp: ticket.timestamp,
                source: ticket.source,
                sourceId: ticket.sourceId,
                updatedByUserId: ticket.updatedByUserId

            })

            count++

        }

        for(let i = 0; i < ids.length; i++){

            if ( ids[i] === ticket.id) ids.splice(i, 1);

        }

    }

    ids.forEach(id => {

        db.Ticket.findByPk(id)
            .then(ticket => {

                ticket.destroy()
                count ++

            })

    })

    console.log("Synchronized " + count + " tickets!", new Date())

})()