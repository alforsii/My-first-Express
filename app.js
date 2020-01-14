const express = require('express');

// We create our own server named app
// Express server will be handling requests and responses
const app = express();

// Make everything inside of public/ available
app.use(express.static('public'));

// //1.
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

//2. Better and cleaner way of writing our code
// we separated our html files from js, and put them inside view folder
// ...
// our first Route:
app.get('/home', (request, response, next) =>
  response.sendFile(__dirname + '/views/home-page.html')
);

// cat route:
app.get('/cat', (request, response, next) =>
  response.sendFile(__dirname + '/views/cat-page.html')
);
// ...
// 1.Here, we are using a new method that is part of the response object: sendFile().
// The sendFile() method allows us to respond with the contents of a file.
// It’s an alternative to send() which only allows us to send a string directly.
// 2.__dirname (two underscores) refers to the folder in which our app.js is located.
// Try to console.log(__dirname) so you can see its value.
// If we don’t specify the complete path to the HTML file our sendFile() will fail.

// ... the previously added code
// Server Started
app.listen(3000, () => console.log('My first app listening on port 3000! '));
