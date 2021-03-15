const db = require('./models');

const utils = require('./utils')

const accessToken = process.argv[2]

if (process.argv.length !== 3) process.exit(1);

(async () => {

    const contacts = utils.getAllContacts(accessToken)

    const contactIdsFromDb = await db.Contact.findAll({attributes: ['vid']})

    const ids = []

    for (const obj of contactIdsFromDb) {

        ids.push(obj.dataValues.vid)

    }

    let count = 0

    for (const contact of contacts) {

        let contactFromDb = await db.Contact.findByPk(contact.vid)

        if (contactFromDb) {

            if (!utils.contactsMatches(contact, contactFromDb.dataValues)) {

                contactFromDb.firstname = contact.firstname
                contactFromDb.lastname = contact.lastname

                contactFromDb.save()

            }

            count++

        } else {

            db.Contact.create({

                vid: contact.vid,
                firstname: contact.firstname,
                lastname: contact.lastname,
                createdate: contact.createdate

            })

            count++

        }

        for(let i = 0; i < ids.length; i++){

            if ( ids[i] === contact.vid) ids.splice(i, 1);

        }

    }

    ids.forEach(id => {

        db.Contact.findByPk(id)
            .then(contact => {

                contact.destroy()
                count ++

            })

    })

    console.log("Synchronized " + count + " contacts!", new Date())

})()