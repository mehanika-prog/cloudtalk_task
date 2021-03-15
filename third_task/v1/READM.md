```javascript
(async () => {

    console.time("HubSpot from npm")

    const contacts = await hubspot.contacts.getAll()

    const tickets = await hubspot.tickets.getAll(["content"])

    console.timeEnd("HubSpot from npm")



    console.time("Custom")

    const contacts2 = getAllContacts(accessToken)

    const tickets2 = getAllTickets(accessToken)

    console.timeEnd("Custom")

})()
```