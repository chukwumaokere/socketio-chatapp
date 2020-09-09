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


### DEMO:

#### New Version: 
Image of chat that fills up the screen from Customer Service perspective<br>
![Image of chat that fills up the screen from Customer Service representative perspective](https://i.gyazo.com/8513f7e373bb7df90140efa13d575aa9.png)<br>
Image of chat that fills up the screen from Customers perspective<br>
![Image of chat that fills up the screen from Customers perspective](https://i.gyazo.com/24b3ac4243cd2a804d4e3d5db0f32f13.png)<br>
Image of the retrying connection function<br>
![Image of the retrying conncetion function](https://i.gyazo.com/24246dac3706102403d7bf66e53d7b0e.png)<br>
Image of the retrying connection function finding an available room<br>
![Image of the retrying connection function finding an available room](https://i.gyazo.com/9147246a3aeba22cba63c0519b3a8fdc.png)<br>
Image of swapping customers from the Customer Service Representative perspective<br>
![Image of swapping customers from the Customer Service Representative perspective](https://i.gyazo.com/870049965e7c6f70847a5ae6f2a89d5d.png)<br>

#### Old version: 
Gif of chat realtime interaction<br>
![Gif of chat realtime interaction](https://i.gyazo.com/cab0906fcdbf7d2d4daa754ee150c7a9.gif)<br>
Image of some chat<br>
![Image of some chat](https://i.gyazo.com/6e2e7525f7bb36e05fb7468fdf45ca3c.png)<br>
