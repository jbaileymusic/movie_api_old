const express = require('express');
    app = express();
    bodyParser = require('body-parser');
    uuid = require('uuid');
    morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('common'));

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
]

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
];


//READ (GET) FUNCTIONS
// GET All Movies
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

// GET Movie Data on a Specific Title
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('No such movie!')
    }
});

// GET Genre Data
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('No such genre!')
    }
});

// GET Director Data
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('No such director!')
    }
});




//CREATE (POST) FUNCTIONS
// Add New User
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('The user needs to provide a name.');
    }
});

// Add Movie to User Favorites
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s favorites.`);
    } else {
        res.status(400).send(`Movie does not exist or could not be added to user ${id}'s favorites.`);
    }
});


//UPDATE (PUT) FUNCTIONS
//Update User Info (username)
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('This user does not exist');
    }
});


//DELETE FUNCTIONS
// DELETE Movie from Favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s favorites.`);
    } else {
        res.status(400).send(`Movie does not exist or could not be added to user ${id}'s favorites.`);
    }
});

// DELETE User
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send(`User ${id} has been deleted.`);
    } else {
        res.status(400).send('No such user.');
    }
});


app.listen(8080, () => {
    console.log('FlixLink is listening on Port 8080.');
});

