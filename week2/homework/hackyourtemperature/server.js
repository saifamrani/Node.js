const express = require('express');
const hbs = require('express-handlebars');
const app = express();

const weatherRoutes = require('./routes/weather');

app.engine('hbs', hbs({ defaultLayout: 'main-layout', extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(weatherRoutes);

const PORT = process.env.port || 3000;
app.listen(PORT, () => console.log('server is running ...'));
