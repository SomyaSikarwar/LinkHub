const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userAccountController = require('./controllers/userAccountController');
const linkTreeController = require('./controllers/linkTreeController');

app.use(bodyParser.json());

// User Account Routes
app.use('/api/user', userAccountController);

// LinkTree Routes
app.use('/api/linktree', linkTreeController);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
