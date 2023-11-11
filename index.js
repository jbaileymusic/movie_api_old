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

app.use(bodyParser.json());
app.use(morgan('common'));

/* //old sample users
let users = [
    {
        id: 1,
        name: 'John',
        favoriteMovies: ['Lord of the Rings']
    },
    {
        id: 2,
        name: 'Akari',
        favoriteMovies: []
    },
] */

/* //old sample movies
let movies = [
    {
        'Title': 'Psycho',

        'Description': 'Phoenix secretary Marion Crane (Janet Leigh), on the lam after stealing $40,000 from her employer in order to run away with her boyfriend, Sam Loomis (John Gavin), is overcome by exhaustion during a heavy rainstorm. Traveling on the back roads to avoid the police, she stops for the night at the ramshackle Bates Motel and meets the polite but highly strung proprietor Norman Bates (Anthony Perkins), a young man with an interest in taxidermy and a difficult relationship with his mother.',

        'Genre': {
            'Name': 'Horror',

            'Description': 'Horror is a film genre that seeks to elicit fear or disgust in its audience for entertainment purposes.Horror films often explore dark subject matter and may deal with transgressive topics or themes. Broad elements include monsters, apocalyptic events, and religious or folk beliefs.',
        },

        'Director': {
            'Name': 'Alfred Hitchcock',

            'Bio': 'English film director, screenwriter, producer and editor. In a career spanning six decades, he directed over 50 feature films, many of which are still widely watched and studied today. Known as the "Master of Suspense", he became as well known as any of his actors thanks to his many interviews, his cameo roles in most of his films, and his hosting and producing the television anthology Alfred Hitchcock Presents (1955-65). His films garnered 46 Academy Award nominations, including six wins, although he never won the award for Best Director, despite five nominations.',
            
            'Birth': 1899.0
        },

        'ImageURL': '/images/psycho',

        'Featured': true
    },

    {
        'Title': 'Star Wars',

        'Description': 'A long time ago in a galaxy far, far away...It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire\'s ultimate weapon, the DeathStar, an armored space station with enough power to destroy an entire planet. Pursued by the Empire\'s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy.',

        'Genre': {
            'Name': 'Sci-Fi',

            'Description': 'Science fiction, abbreviation SF or sci-fi, a form of fiction that deals principally with the impact of actual or imagined science upon society or individuals. The term science fiction was popularized, if not invented, in the 1920s by one of the genre\'s principal advocates, the American publisher Hugo Gernsback.',
        },

        'Director': {
            'Name': 'George Lucas',

            'Bio': 'American filmmaker and philanthropist. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, LucasArts, Industrial Light & Magic, and THX. He served as chairman of Lucasfilm before selling it to The Walt Disney Company in 2012. Lucas is one of history\'s most financially successful filmmakers and has been nominated for four Academy Awards. Lucas personally directed or conceived 10 of the 100 highest-grossing movies at the North American box office, adjusted for ticket-price inflation. Lucas is considered to be one of the most significant figures of the 20th-century New Hollywood movement, and a pioneer of the modern blockbuster. Despite this, he has remained an independent filmmaker away from Hollywood for most of his career.',
            
            'Birth': 1944.0
        },

        'ImageURL': '/images/starwarsiv',

        'Featured': false
    },

    {
        'Title': 'Raiders of the Lost Ark',

        'Description': 'Follow the adventures of the iconic archaeologist and adventurer, Indiana Jones. Indy is on a quest to find the Ark of the Covenant before the Nazis can get their hands on it. The Ark is believed to hold unimaginable power, and Indy must travel the globe, facing danger and treacherous traps, to prevent the Nazis from using it for their nefarious purposes. Along the way, he\'s joined by Marion Ravenwood, and they must outwit their enemies in a thrilling race against time. The film is known for its memorable action sequences, iconic characters, and its blend of history, mythology, and adventure.',

        'Genre': {
            'Name': 'Action-Adventure',

            'Description': 'The action-adventure movie genre is a dynamic and thrilling film category that combines elements of intense action, daring stunts, and often epic journeys or quests. These films typically feature a courageous protagonist who embarks on a high-stakes mission, often against formidable antagonists, in exotic or dangerous settings. Action-adventure movies are known for their fast-paced sequences, including intense battles, chases, and dramatic confrontations. While action is a central element, these films also incorporate character development, intricate plots, and a sense of exploration or discovery.',
        },

        'Director': {
            'Name': 'Steven Spielberg',

            'Bio': 'Steven Spielberg is a highly acclaimed American filmmaker, known for his prolific career in the world of cinema. Born on December 18, 1946, in Cincinnati, Ohio, he is a director, producer, and screenwriter. Spielberg is considered one of the most influential and successful directors in the history of filmmaking. He is known for his versatility in creating a wide range of films, from iconic blockbusters like "E.T. the Extra-Terrestrial," "Jurassic Park," and "Indiana Jones" to more serious and thought-provoking works like "Schindler\'s List" and "Saving Private Ryan." With numerous Academy Awards and a reputation for storytelling excellence, Spielberg has left an indelible mark on the film industry and continues to be a celebrated figure in modern cinema.',
            
            'Birth': 1946.0
        },

        'ImageURL': '/images/raidersofthelostark',

        'Featured': false
    },
]; */


//READ (GET) FUNCTIONS

//GET ALL USERS
app.get('/users', async (req, res) => {
    await Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//GET USER BY USERNAME
app.get('/users/:UserName', async (req, res) => {
    await Users.findOne({ UserName: req.params.UserName})
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// GET All Movies
app.get('/movies', async (req, res) => {
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
app.get('/movies/:Title', async (req, res) => {
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
app.get('/genres', async (req, res) => {
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
app.get('/genres/:Name', async (req, res) => {
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
app.get('/directors', async (req, res) => {
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
app.get('/directors/:Name', async (req, res) => {
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
    await Users.findOne({ UserName: req.body.UserName})
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists.');
            } else {
              Users
                .create ({
                    UserName: req.body.UserName,
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
app.post('/users/:UserName/movies/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate({ UserName: req.params.UserName }, {
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
//Update User Info (username)
app.put('/users/:UserName', async (req, res) => {
    await Users.findOneAndUpdate({ UserName: req.params.UserName }, { $set:
        {
            UserName: req.body.UserName,
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
app.delete('/users/:UserName/movies/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate({ UserName: req.params.UserName }, {
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
app.delete('/users/:UserName', async (req, res) => {
    await Users.findOneAndRemove({ UserName: req.params.UserName })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.UserName + ' was not found.');
            } else {
                res.status(200).send(req.params.UserName + ' was deleted.');
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

