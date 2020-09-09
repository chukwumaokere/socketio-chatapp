# Code for an easily embeddable chat app

This chat app emulates the same idea of running a chat app using something like Google Firebase.
It has the advantages of software like https://www.ringcentral.com/digital-customer-engagement.html or any other customer engagement service, FREE OF COST. It has no concurrent connection limit 

## How to run:
1) Embed the HTML and script into your index.html file
2) Run the app.js using Node `node app.js`
3) Open the chat on the Index pages

## Todo: 
1) Add support for keeping message logs in localStorage
2) Refreshing or navigating should keep the session open, and reload the chat since VT is not an SPA
3) Add support for auto-connecting if the chat window is already open and user navigates or refresh (will need to store the value of the connected room then use JS to reopen and reconnect to a specific room using join_room directly)
4) ~~If msg == room is full, setTimeout every 30 seconds join_random_room until joinedRoom == true~~
5) ~~Bold the message senders name~~
6) Fix the date stamp
7) ~~Render messages on opposite sides~~
8) ~~update styles of chat~~
9) Fix hovering date to either stay updated or to scroll.