require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const postRoutes = require('./src/routes/post.route');
const commentRoutes = require('./src/routes/comment.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World Cuentame!');
});

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/comment', commentRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
