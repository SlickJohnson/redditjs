const express = require('express');

const app = express();

const exphbs = require('express-handlebars');

const port = 3000;

const bodyParser = require('body-parser');

const expressValidator = require('express-validator');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.listen(port, () => console.log(`Listening to port ${port}!`));

require('./controllers/posts.js')(app);
require('./controllers/comments-controller.js')(app);

require('./data/reddit-db');
