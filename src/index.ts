import dotenv from 'dotenv';

import * as connector from './db/db-connector';
import * as express from './configuration/express.config';

// initialize configuration
dotenv.config();

const dbUrl = process.env.NODE_ENV === 'prod' ?
    process.env.MONGODB_URI_PROD :
    process.env.MONGODB_URI_LOCAL;

// Connect to MongoDb
const dbOptions = {
    url: dbUrl,
    useCreateIndex: true,
    useNewUrlParser: true
};
connector.DbConnector.connect(dbOptions);

const app = express.expressConfig();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

// start the Express server
const server = app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
    // tslint:disable-next-line:no-console
    console.log('  Press CTRL-C to stop\n');
} );

export default server;
