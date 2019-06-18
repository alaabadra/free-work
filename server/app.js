const express = require('express');
const cookie = require('cookie-parser');
const { join } = require('path');

const router = require('./routes');

const app = express();

app.use(express.json());

app.use(cookie());

app.set('port', process.env.PORT || 4000);
app.use((req,res,next) => {
    console.log(req.url)
    next();
})
app.use('/api/v1', router);

// app.use(express.static(join(__dirname, '..', 'client', 'build')));

// app.get('*', (_req, res) => {
//   res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
// });

module.exports = app;
