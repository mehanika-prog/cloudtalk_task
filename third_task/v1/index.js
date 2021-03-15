const { spawn } = require('child_process');

// This token may be old!
const accessToken = "CMO8ssGDLxIDAQEBGJWnpgkgkaujCyiT1hAyGQB14gZJBU3UZtq4dzIDGNuXZp9yKwmZm0U6GgAKAkEAAAyAwgcIAAAAAQAAAAAAAAAYwAAfQhkAdeIGSeZfXP-SK5YeNNyCdTFHFImPjdJ8"

function timeoutFunc() {

    const ls = spawn("node", [
        "sync_contacts.js",
        accessToken
    ])

    const ls2 = spawn("node", [
        "sync_tickets.js",
        accessToken
    ])

    ls.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });

    ls2.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    ls2.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    ls2.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });

    setTimeout(timeoutFunc, 600000); // 10min * 60sec * 1000millis
}

timeoutFunc();