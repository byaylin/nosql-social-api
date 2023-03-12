const express = require('express');
const allRoutes = require('../../routes');
const db = require('../../config/connection');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json);
app.use(allRoutes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    });
});