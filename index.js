const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//set static path

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey = 'BJCEH1SXAoei31rVgnx_Zbjf5ZoRQKmKD0EJKiBganZcbp9nLeDr5bwRJnJwHw4nVGwDEMww4tAUwQmjt2brdI8';
const privateVapidKey = 'w5fr0tDB97FVK18p8Fgd-9m0rX708zMc0KuM3dFc1Tk';

webPush.setVapidDetails('mailto: test@test.com', publicVapidKey, privateVapidKey);

// Subscribe routes - responsible for sending push notifications

app.post('/subscribe',(req,res) => {
    // Get push subscription object
    const subscription = req.body;

    // Send 201 - resource created

    res.status(201).json({});

    // Create payload

    const payload = JSON.stringify({title: 'Push Test'});;
    
    // pass the object into send notification function 
    webPush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;
app.listen(port, () => console.log(port));
