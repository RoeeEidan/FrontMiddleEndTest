const express = require('express');
const app = express();
var path = require('path');

const PORT = process.env.PORT || 80;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
    console.log("Get request is running.");
})
app.listen(PORT, () => {
    console.log('Server Started on ' + PORT);

});


