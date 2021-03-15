const request = require('sync-request')

//====================================================================================
//                                    Contacts
//====================================================================================

const contactsMatches = (contact1, contact2) => {

    try {

        if (contact1.firstname !== contact2.firstname) return false
        if (contact1.lastname !== contact2.lastname) return false
        if (contact1.createdate.getDate() !== contact2.createdate.getDate()) return false
        if (contact1.createdate.getHours() !== contact2.createdate.getHours()) return false
        if (contact1.createdate.getMinutes() !== contact2.createdate.getMinutes()) return false
        return contact1.createdate.getSeconds() === contact2.createdate.getSeconds();

    } catch (e) { return false }

}

const getContactsCount = (accessToken) => {

    if (!accessToken) {

        throw new Error("Access token missing!")

    }

    let res = request(
        'GET',
        'https://api.hubapi.com/contacts/v1/contacts/statistics',
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
    )

    return JSON.parse(res.getBody()).contacts

}

const getContactById = (vid, accessToken) => {

    if (!accessToken) {

        throw new Error("Access token missing!")

    }

    if (!vid) {

        throw new Error("Vid token missing!")

    }

    let res = request(
        'GET',
        `https://api.hubapi.com/contacts/v1/contact/vid/${vid}/profile`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
    )

    try {

        return JSON.parse(res.getBody())

    } catch (e) {

        throw new Error("Something wrong with access token!")

    }

}

const getContactsObj = (accessToken, vidOffset = 0) => {

    if (!accessToken) {

        throw new Error("Access token missing!")

    }

    const contactsRes = request(
        'GET',
        `https://api.hubapi.com/contacts/v1/lists/all/contacts/all
        ?vidOffset=${vidOffset}&property=firstname&property=lastname&property=createdate`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
    )

    try {

        return JSON.parse(contactsRes.getBody())

    } catch (e) {

        throw new Error("Something wrong with access token!")

    }

}

const getAllContacts = (accessToken) => {

    if (!accessToken) {

        throw new Error("Access token missing!")

    }

    let contacts = []

    let hasMore = true
    let vidOffset = 0

    while (hasMore) {

        let contactsObj = getContactsObj(accessToken, vidOffset)

        if (contactsObj.contacts.length > 0) {

            contactsObj.contacts.forEach(contact => {

                let data = {
                    vid: contact.vid,
                    firstname: contact.properties.firstname.value,
                    lastname: contact.properties.lastname.value,
                    createdate: new Date(parseInt(contact.properties.createdate.value))
                }

                contacts.push(data)

            })

            hasMore = contactsObj["has-more"]
            vidOffset = contactsObj["vid-offset"]

        } else { hasMore = false }

    }

    return contacts

}

const getAllContactsIDs = (contacts) => {

    if (!contacts || !contacts[0] || !contacts[0].vid) return []

    const ids = []

    contacts.forEach(contact => { ids.push(contact.vid) })

    return ids

}

const getRecentlyModifiedContactsObj = (accessToken, timeOffset = 0) => {

    if (!accessToken) {

        throw new Error("Access token missing!")

    }

    const res = request(
        'GET',
        `https://api.hubapi.com/contacts/v1/lists/recently_updated/contacts/recent
        ?timeOffset=${timeOffset}&property=firstname&property=lastname&property=createdate`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
    )

    try {

        return JSON.parse(res.getBody())

    } catch (e) {

        throw new Error("Something wrong with access token!")

    }



}


exports.contactsMatches = contactsMatches
exports.getContactById = getContactById
exports.getContactsCount = getContactsCount
exports.getContactsObj = getContactsObj
exports.getAllContacts = getAllContacts
exports.getAllContactsIDs = getAllContactsIDs
exports.getRecentlyModifiedContactsObj = getRecentlyModifiedContactsObj


//====================================================================================
//                                    Tickets
//====================================================================================

const ticketsMatches = (ticket1, ticket2) => {

    try {

        if (ticket1.value !== ticket2.value) return false
        if (ticket1.source !== ticket2.source) return false
        if (ticket1.sourceId !== ticket2.sourceId) return false
        if (ticket1.updatedByUserId !== ticket2.updatedByUserId) return false
        if (ticket1.timestamp.getHours() !== ticket2.timestamp.getMinutes()) return false
        if (ticket1.timestamp.getMinutes() !== ticket2.timestamp.getMinutes()) return false
        return ticket1.timestamp.getSeconds() === ticket2.timestamp.getSeconds();

    } catch (e) { return false }

}

const getTicketsObj = (accessToken, vidOffset = 0) => {

    if (!accessToken) {

        throw new Error("Access token missing!")

    }

    const ticketsRes = request(
        'GET',
        'https://api.hubapi.com/crm-objects/v1/objects/tickets/paged',
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            qs: {
                vidOffset: vidOffset,
                properties: "content"
            }
        }
    )

    try {

        return JSON.parse(ticketsRes.getBody())

    } catch (e) {

        throw new Error("Something wrong with access token!")

    }

}

const getAllTickets = (accessToken) => {

    if (!accessToken) {

        throw new Error("Access token missing!")

    }

    let tickets = []

    let hasMore = true
    let vidOffset = 0

    while (hasMore) {

        let ticketsObj = getTicketsObj(accessToken, vidOffset)

        if (ticketsObj.objects.length > 0) {

            ticketsObj.objects.forEach(object => {

                let data = {
                    id: object.objectId,
                    value: object.properties.content.value,
                    timestamp: new Date(object.properties.content.timestamp),
                    source: object.properties.content.source,
                    sourceId: object.properties.content.sourceId,
                    updatedByUserId: object.properties.content.updatedByUserId
                }

                tickets.push(data)

            })

            hasMore = ticketsObj.hasMore
            vidOffset = ticketsObj.offset

        } else { hasMore = false }

    }

    return tickets

}


exports.ticketsMatches = ticketsMatches
exports.getTicketsObj = getTicketsObj
exports.getAllTickets = getAllTickets


//====================================================================================
//                                    General
//====================================================================================


const needDeleteFromDB = (id, ids) => {

    try {

        ids.forEach(i => {

            if (id === i) return false

        }).then(() => { return true })

    } catch (e) { return false }

}


exports.needDeleteFromDB = needDeleteFromDB
