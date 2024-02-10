/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds
};

// request object - method checks for the request to the server (get post, etc)
// url = endpoint of server
// response.writeHead must include statusCode and header
// response.end is whatever we send back to the user, if anything
// initialize empty array to hold messages from post request
// '/classes/messages' endpoint
// our data is an array of objects, when it's a post request, we will store the strinified data
// status code for post = 201?

// // response {
//   // data: [
//     {

//     }
//   ]
// }
var postDataArray = [];
var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 404;
  var correctURL = '/classes/messages';
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
  if (request.url !== correctURL) {
    response.writeHead(statusCode, headers);
    response.end();
  } else if (request.method === 'GET') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(postDataArray));
  } else if (request.method === 'POST') {
    var rawData = '';
    request.on('data', (chunk) => {rawData += chunk; } );
    rawData = JSON.parse(rawData);
    statusCode = 201;
    response.writeHead(statusCode, headers);
    postDataArray.push(rawData);
    response.end('POSTED');
  } else if (request.method === 'DELETE') {

    response.writeHead(statusCode, headers);
    response.end('INVALID METHOD TYPE FOR NOW');
  }
  // response.writeHead(statusCode, headers);
  // response.end('Hello, World!');
};



module.exports.requestHandler = requestHandler;

// Make sure to always call response.end() - Node may not send
// anything back to the client until you do. The string you pass to
// response.end() will be the body of the response - i.e. what shows
// up in the browser.
//
// Calling .end "flushes" the response's internal buffer, forcing
// node to actually send all the data over to the client.

// .writeHead() writes to the request line and headers of the response,
// which includes the status and all headers.


// Tell the client we are sending them plain text.
//
// You will need to change this if you are sending something
// other than plain text, like JSON or HTML.

// See the note below about CORS headers.

// Request and Response come from node's http module.
//
// They include information about both the incoming request, such as
// headers and URL, and about the outgoing response, such as its status
// and content.
//
// Documentation for both request and response can be found in the HTTP section at
// http://nodejs.org/documentation/api/

// Do some basic logging.
//
// Adding more logging to your server can be an easy way to get passive
// debugging help, but you should always be careful about leaving stray
// console.logs in your code.