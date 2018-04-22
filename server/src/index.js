import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import dotenv from 'dotenv';

/**
 * Create Express app
 **/
const app = express();
const PORT = process.env.PORT || 9001;
app.set('port', PORT);

/**
 * config dotenv
 **/
if (app.get('env') === 'development') {
	dotenv.config();
}

/**
 * Setup middleware --
 **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
const staticFiles = express.static(
	path.join(__dirname, '../../../client/build')
);
app.use(staticFiles);

/**
 * Routes/Routing
 **/
require('./routes')(app);
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use('/*', staticFiles);

/**
 * Start Server & Connect to DB
 **/
const httpServer = require('http').createServer(app);

httpServer.listen(app.get('port'), () => {
	mongoose.Promise = bluebird;
	mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

	var db = mongoose.connection;
	db.on('error', err => {
		console.error(err);
		process.exit(1);
	});
	db.once('open', () => {
		console.log(
			`Express server listening on ${app.get('port')}, in ${app.get('env')} mode.`
		);
	});
});

module.exports = app;
