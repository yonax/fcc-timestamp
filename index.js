const path = require('path');
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});