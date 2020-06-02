const express = require('express');

const cors = require('cors');

const postRoutes = require('./routers/postRoutes');

const app = express();
app.use(express.json())
app.use(cors());

app.use('/api/posts', postRoutes);

app.use('/', (req, res) => res.send('Up and running'));

app.listen(5000);