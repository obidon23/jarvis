READ ME
------------------------------------------------------------
What is Jarvis?
------------------------------------------------------------
Welcome to the greatest search tool ever made, Jarvis! You can find the most recent tweets from your favorite celebrities, learn trivia about your favorite movies, or find info on your favorite songs. 

------------------------------------------------------------
Setting up Jarvis
------------------------------------------------------------
On the command line, type: 

npm install

------------------------------------------------------------
Instructions for using Jarvis
------------------------------------------------------------
On the command line, type: 

node jarvis +

	For TWITTER: twitter [screen name] 

	For MOVIES: movie-this '[movie title]' 

	For TWITTER: spotify-this-song '[song title]' 

	For LAZY USERS: do-what-it-says


/END

------------------------------------------------------------
ABOUT THE PROJECT
------------------------------------------------------------
This project required the use of a number of skills related to node.js. I installed multiple NPMS (Spotify, Twitter) and built a separate text file to assist with the "LAZY USERS". I built a keys file that exports so that my main js can require it. I pulled in my text file with a require("fs"). The biggest challenge was getting Spotify to initialize using my credentials. 

------------------------------------------------------------
WHAT'S NEXT?
------------------------------------------------------------
The project's bonus challenge was to build a log.txt file that appends with each command. Also, this would be much better if it pushed to a browser for a nice display and some styling. I could also add some "styling" on the command screen.
