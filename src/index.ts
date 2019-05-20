import dotenv from 'dotenv';
import express from 'express';

import * as connector from './db/db-connector';
import * as routes from './routes';

// initialize configuration
dotenv.config();

// Connect to MongoDb
const dbOptions = {
    url: 'mongodb://localhost/orgdb',
    useCreateIndex: true,
    useNewUrlParser: true
};
connector.DbConnector.connect(dbOptions);

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app = express();

// Configure routes
routes.register( app );

// start the Express server
const server = app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
    // tslint:disable-next-line:no-console
    console.log('  Press CTRL-C to stop\n');
} );

export default server;
