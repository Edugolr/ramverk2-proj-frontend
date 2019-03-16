# frontend-trading


## Techs
* Vue : frontend framework
* Bootstrap-Vue : css framework

I have worked with Vue through this course (ramverk2 BTH 2019) so the choice was simple now.
From the beginning i based my choice on some google cravling to see what people thought about different js frontend fameworks. This together with Vue beeing stated to have a short learning-curve  a good documentation and beeing community backed made up my mind.

I paired it with bootstrap-vue to get some handy css tools and easely making the design responsive.

## Real-time
* Highcharts: Chart for stockvalue
* sails.io.js and socket.io.client : webbsocket

I choose Highcharts cause it looked nice and the documentaion seemed good. Despite having some troubles with handling the time in the chart I think it works very well and is easy to implement and understand. The realtime update was quick to implement using their addPoint function on the series.

In the main.js file I require sails.io.js and socket.io.client according to the Sails guide
i have to pass the socket.io.client into sails.io.
After that I write it to the io variable , set the baseurl to the backend and then make the variable global.

Then in market.vue I use it to subscribe to the card route. This is something sails does or should do out of the box.
You basicly just do a get on the route for the api and you should be subscribed to the model. However this only worked on create and not on patch, so I had to join a special subsribe route I created in backend to receive the price uppdates on the model.

I used to socket io to update the stockchart and the players price making it real-time.

I think it generally worked rather good, except for the hickup with patching which might be me not fully grasping how it is intended to be used.


## Selenium Test
### Use-cases
1. Go to the startpage (https://frontend.chai17.me)
2. Go to the login and register page via the Login/Register link
3. Write in the email input
4. Write in the password input
5. Fill out the login form and press the login button
6. Fill out the login form and press the login button and go to the new nav link Market.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
