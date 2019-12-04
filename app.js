const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

const psApps = require('./playstore-data.js');

// Create GET endpoint /apps
app.get('/apps', (req, res) => {
    // endpoint will accept paramters: sort & genre
    const { sort, genre } = req.query;

    // return complete list of apps in the array
    let results = [...psApps];

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

    // genre = if selected is one of ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'] or else error. filter by genre
    // if (genre) {
    //     const genreOptions = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

    //     if (!genreOptions.includes(genre)) {
    //         return res.status(400).send('Genre must be Action, Puzzle, Strategy, Casual, Arcade, or Card.');
    //     }

    //     //filter results by genre
    //     results = results.filter ( app => {
    //         app["Genres"].includes(genre)
    //     })

    // }
    res.send(results)

})


app.listen(8000, () => {
    console.log('Server started on PORT 8000!');
})