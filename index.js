const path = require('path');
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/:stampOrDate', function (request, response) {
    const date = getDate(request.params.stampOrDate);  
    const result = {
        unix: !date ? null : unixTimestamp(date),
        natural: !date ? null : formatDate(date)
    };
    response.json(result);
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

function getDate(s) {
    // string contains either a unix timestamp or a
    // natural language date (example: January 1, 2016)
    if (!s) {
        return;
    } else if (/^\d+$/.test(s)) { // unix timestamp
        return new Date(parseInt(s, 10) * 1000);
    } else {
        return new Date(Date.parse(s));
    }
}

function formatDate(d) {
    return d.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
}

function unixTimestamp(d) {
    return Math.round(d.getTime() / 1000);
}