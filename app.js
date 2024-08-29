const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', require('./controllers/urlController'));
app.use('/api', require('./controllers/linkTreeController'));
app.use('/api', require('./controllers/treeNodeController'));
app.use('/api', require('./controllers/UserAccountController')); // Add this line

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
