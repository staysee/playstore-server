const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

const psApps = require('./playstore-data.js');

// Create GET endpoint /apps
app.get('/apps', (req, res) => {
    // endpoint will accept paramters: sort & genre
    const { genre ="", sort } = req.query;

    let results = psApps.filter ( app =>
        app.Genres.toLowerCase().includes(genre.toLowerCase()) );

    // genre = if selected is one of ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'] or else error. filter by genre
    if (genre) {
        const genreOptions = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

        let genreSelected = genre.charAt(0).toUpperCase() + genre.substring(1);

        if (!genreOptions.includes(genreSelected)) {
            return res.status(400).send('Genre must be Action, Puzzle, Strategy, Casual, Arcade, or Card.');
        }
    }

    // sort = "rating" or "app", or else do not sort
    if (sort) {
        if (!['rating', 'app'].includes(sort)) {
            return res.status(400).send('Sort must be one of rating or app');
        }

        let sortBy = sort.charAt(0).toUpperCase() + sort.substring(1);

        //sort the results
        results.sort( (a, b) => {
            return a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0;
        });
    }

    
    res.status(200).json(results)
})


module.exports = app;