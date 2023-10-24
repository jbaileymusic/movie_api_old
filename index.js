const express = require('express');
    morgan = require('morgan');

const app = express();

app.use(morgan('common'));

let top10Movies = [
    {
        title: 'Adventure Movie A',
        author: 'Steven Spielberg'
    },
    {
        title: 'Adventure Movie B',
        author: 'Steven Spielberg'
    },
    {
        title: 'Adventure Movie C',
        author: 'Steven Spielberg'
    },
    {
        title: 'Action Movie A',
        author: 'John Woo'
    },
    {
        title: 'Action Movie B',
        author: 'John Woo'
    },
    {
        title: 'Action Movie C',
        author: 'John Woo'
    },
    {
        title: 'Sci-Fi Movie A',
        author: 'George Lucas'
    },
    {
        title: 'Sci-Fi Movie B',
        author: 'George Lucas'
    },
    {
        title: 'Sci-Fi Movie C',
        author: 'George Lucas'
    },
    {
        title: 'Horror Movie',
        author: 'Alfred Hitchcock'
    },
]

app.get('/', (req, res) => {
    res.send('Welcome to FlixLink!');
});

app.get('/movies', (req, res) => {
    res.json(top10Movies);
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('The code\'s not working Captain!');
  });

app.listen(8080, () => {
    console.log('FlixLink is listening on Port 8080.');
});

