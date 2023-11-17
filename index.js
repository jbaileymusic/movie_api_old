const mongoose = require('mongoose');
    Models = require('./models.js');
    Movies = Models.Movie;
    Users = Models.User;
    Genres = Models.Genre;
    Directors = Models.Director

mongoose.connect('mongodb://127.0.0.1:27017/flexlinkDB', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
    app = express();
    bodyParser = require('body-parser');
    uuid = require('uuid');
    morgan = require('morgan');

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

app.use(bodyParser.json());
app.use(morgan('common'));



//READ (GET) FUNCTIONS

//GET ALL USERS: This function has been disabled to disallow any user from accessing all user info. It may be reactivated later to allow only system admin to access.
/* app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
}); */

//GET USER BY USERNAME
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    
    //Condition to check for the same user
    if(req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    } //End of condition
    
    await Users.findOne({ Username: req.params.Username})
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// GET All Movies
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET Movie Data on a Specific Title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.findOne({ Title: req.params.Title})
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// GET All GENRES
app.get('/genres', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Genres.find()
        .then((genres) => {
            res.status(201).json(genres);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// GET Genre Data by Genre Name
app.get('/genres/:Name', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Genres.findOne({ Name: req.params.Name})
        .then((genre) => {
            res.json(genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET All DIRECTORS
app.get('/directors', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Directors.find()
        .then((directors) => {
            res.status(201).json(directors);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// GET Director Data by Director Name
app.get('/directors/:Name', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Directors.findOne({ Name: req.params.Name})
        .then((director) => {
            res.json(director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});




//CREATE (POST) FUNCTIONS
// Add New User
app.post('/users', async (req, res) => {
    await Users.findOne({ Username: req.body.Username})
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + ' already exists.');
            } else {
              Users
                .create ({
                    Username: req.body.Username,
                    Password: req.body.Password,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday
                })
                .then ((user) => {res.status(201).json(user) })
              .catch ((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
              })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// Add Movie to User Favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
    
    //Condition to check for the same user
    if(req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    } //End of condition
    
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true })
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});


//UPDATE (PUT) FUNCTIONS
//Update User Info (Username)
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    
    //Condition to check for the same user
    if(req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    } //End of condition

    await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
        { new: true }) 
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        })
});


//DELETE FUNCTIONS
// DELETE Movie from Favorites
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true })
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// DELETE User
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.findOneAndDelete({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found.');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


app.listen(8080, () => {
    console.log('FlixLink is listening on Port 8080.');
});

