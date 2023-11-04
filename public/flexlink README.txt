FLIXLINK Documentation
©2023 John Bailey
Developed for Career Foundry Full-Stack Development Course, Task 2.5, Movie_API. 


WHAT IS FLEXLINK?
FlexLink provides users with information about different movies, directors, and genres. The server-side of the FlixLink application will ensure they have access to this information, that their requests can be processed, and that all necessary data can be stored.

Users will be able to create an account with which to enter, maintain, and update their personal information, as well as create a customized list of their favorite movies.



-------------------------
FlexLink API Documentation
The documentation below describes the endpoints and their functionality for managing users and their favorite movies using the Flexlink API.
-------------------------


Create (POST) Functions


Add New User
URL: /users
Method: POST
Description: Adds a new user to the system.
Request Body:
User object with at least a name:

{
"name": "John Doe"
}

Responses:
201 (Created): User created successfully.
{
"id": "unique-id",
"name": "John Doe"
}

400 (Bad Request): The user must provide a name.


Add Movie to User Favorites
URL: /users/:id/:movieTitle
Method: POST
Description: Adds a movie to a user's list of favorite movies.
URL Parameters:
id (string) - User ID.
movieTitle (string) - Movie title to be added to favorites.
Responses:
200 (OK): Movie added to the user's favorites.
400 (Bad Request): Movie does not exist or could not be added to the user's favorites.


---------------------------


Read (GET) Functions


Get All Movie Data
URL: /movies
Method: GET
Description: Returns a list of all movies in the database.
Response Body:
{
"Title": "Movie Title",
"Description": "Movie Description"
"Genre":
"Name": "Genre Name"
"Description": "Genre Description"
"Director":
"Name": "Director Name"
"Bio": "Director Biography"
"Birth": "Director Birth Date"
"Image URL": "Location of the representative image."
"Featured": "True/False."
}


Get Movie Data on a Specified Movie
URL: /movies/:title
Method: GET
Description: Returns all data on the specified movie.
URL Parameters:
title (string) - Title of the movie.
Response Body:
{
"Title": "Movie Title",
"Description": "Movie Description"
"Genre":
"Name": "Genre Name"
"Description": "Genre Description"
"Director":
"Name": "Director Name"
"Bio": "Director Biography"
"Birth": "Director Birth Date"
"Image URL": "Location of the representative image."
"Featured": "True/False."
}


Get Data on a Specified Movie Genre
URL: /movies/genre/:genreName
Method: GET
Description: Returns all data on the specified genre.
URL Parameters:
genreName (string) - Name of the genre.
Response Body:
{
"Name": "Genre Name",
"Description": "Genre Description"
}


Get Data on a Specified Movie Director
URL: /movies/directors/:directorName
Method: GET
Description: Returns all data on the specified director.
URL Parameters:
directorName (string) - Name of the director.
Response Body:
{
"Name": "Director Name",
"Bio": "Director Bio"
"Birth": "Director Birth"
}


----------------------------------

Update (PUT) Functions


Update User Info (Username)
URL: /users/:id
Method: PUT
Description: Updates the name of an existing user.
URL Parameters:
id (string) - User ID.
Request Body:
Updated user object with a new name:

{
"name": "Updated Name"
}

Responses:
200 (OK): User information updated successfully.
{
"id": "unique-id",
"name": "Updated Name"
}

400 (Bad Request): User does not exist.


-------------------------------------

Delete (DELETE) Functions

Delete User Account
URL: /users/:id
Method: DELETE
Description: Deletes a user from the system.
URL Parameters:
id (string) - User ID.
Responses:
200 (OK): User deleted successfully.
400 (Bad Request): No such user.


Delete Movie from Favorites
URL: /users/:id/:movieTitle
Method: DELETE
Description: Removes a movie from a user's list of favorite movies.
URL Parameters:
id (string) - User ID.
movieTitle (string) - Movie title to be removed from favorites.
Responses:
200 (OK): Movie removed from the user's favorites.
400 (Bad Request): Movie does not exist or could not be removed from the user's favorites.
