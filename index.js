const express = require('express');
const bodyparser = require('body-parser');

const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(bodyparser.json())
app.use('/api/posts', postRoutes);


app.use('/', (req, res) => res.send('Up and running'));

app.listen(5000);