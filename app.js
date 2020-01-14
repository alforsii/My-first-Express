const express = require('express');
const path = require('path');
const logger = require('./middleware/Logger.js');
const members = require('./Members');
const PORT = process.env.PORT || 3000;

// We create our own server named app
// Express server will be handling requests and responses
const app = express();

// Make everything inside of public/ available
app.use(express.static('public'));

// //1. Send response from here js file
// // our first Route
// app.get('/home', (request, response, next) => {
//   console.log(request);
//   response.send('<h1>Welcome IronHacker. :)</h1>');
// });

// // ...
// // cat route
// app.get('/cat', (request, response, next) => {
//   response.send(`
//       <!doctype html>
//       <html>
//         <head>
//           <meta charset="utf-8">
//           <title>Cat</title>
//           <link rel="stylesheet" href="/stylesheets/style.css" />
//         </head>
//         <body>
//           <h1>Cat</h1>
//           <p>This is my second route</p>
//           <img src="/images/cool-cat.jpg" />
//         </body>
//       </html>
//     `);
// });

// //2. Send response from views folder
// Better and cleaner way of writing our code
// // we separated our html files from js, and put them inside view folder
// // ...
// // our first Route:
// app.get('/home', (request, response, next) =>
//   response.sendFile(__dirname + '/views/home-page.html')
// );

// // cat route:
// app.get('/cat', (request, response, next) =>
//   response.sendFile(__dirname + '/views/cat-page.html')
// );
// //3. Send response from public folder
// // to get the page we need, type http://localhost:3000/home-page.html
// // to get the page we need,type http://localhost:3000/cat-page.html
app.use(express.static(path.join(__dirname, 'public')));

// ...
// 1.Here, we are using a new method that is part of the response object: sendFile().
// The sendFile() method allows us to respond with the contents of a file.
// It’s an alternative to send() which only allows us to send a string directly.

// 2.__dirname (two underscores) refers to the folder in which our app.js is located.
// Try to console.log(__dirname) so you can see its value.
// If we don’t specify the complete path to the HTML file our sendFile() will fail.

//3. Don’t get confused between the name of the HTML file and the URL.
// The URL is determined by the route: app.get('/cat', ...) means that we need to go to localhost:3000/cat.
// Through the response we connect the route’s URL to the HTML file: response.sendFile(__dirname + 'views/cat-page.html');.
//Making these connections is what backend is all about.

//4.Couldn’t we have placed the HTML files in public/
// and referred to them directly like localhost:3000/cat-page.html?
//Yes!
// But we will see later how this structure of having the route refer to its HTML will be useful.

//4.Lets use middleware
//logger imported from middleware/Logger.js
//init middleware
app.use(logger);
//5.Let's get files from Members.js
app.get('/api/members', (req, res) => res.json(members));

//6.Lets get a single member
app.get('/api/members/:id', (req, res) => {
  //1.
  // res.send(req.params.id);
  //if we type http://localhost:3000/api/members/4 we'll get 4,which is member id
  //2. lets use filter to get every member by their id
  // res.json(members.filter(member => member.id === parseInt(req.params.id)));
  //3.lets now handle if member not found
  const found = members.some(member => member.id === parseInt(req.params.id)); //this will give us true or false
  if (found)
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  else res.status(400).json(`No such a member with the id of ${req.params.id}`);
  // .json({ msg: `No such a member with the id of ${req.params.id}` });
});

// ... the previously added code
// Server Started
// app.listen(3000, () => console.log('My first app listening on port 3000! '));
app.listen(PORT, () => console.log(`My first app listening on port ${PORT}!`));
