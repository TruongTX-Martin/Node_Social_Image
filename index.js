import express  from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

import routeAuth from './src/routes/auth';
import routeAlbum from './src/routes/album';


const app = express();

/**
 * Express Validator Middleware for Form Validation
 */ 
app.use(expressValidator())


/**
 * body-parser module is used to read HTTP POST data
 * it's an express middleware that reads form's input 
 * and store it as javascript object
 */ 

/**
 * bodyParser.urlencoded() parses the text as URL encoded data 
 * (which is how browsers tend to send form data from regular forms set to POST) 
 * and exposes the resulting object (containing the keys and values) on req.body.
 */ 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(express.static('public'));

/**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported
 */ 
/**
 * using custom logic to override method
 * 
 * there are other ways of overriding as well
 * like using header & using query value
 */ 
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))

  app.use('/auth', routeAuth);
  app.use('/album', routeAlbum);

  app.listen(3000, function(){
	console.log('Server running at port 3000: http://127.0.0.1:3000')
  }
)
