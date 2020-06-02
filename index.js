const express = require('express');

const cors = require('cors');

const PORT = 5000;

const postRoutes = require('./routers/postRoutes');

const app = express();
app.use(express.json())
app.use(cors());

app.use('/api/posts', postRoutes);

app.use('/', (req, res) => res.send('Up and running'));

app.listen(PORT, () => {
  console.log(`\n Running on ${PORT}\n`)
});