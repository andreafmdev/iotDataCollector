
import 'reflect-metadata'; // Questo deve essere il primo import
import 'module-alias/register';

import '@config/container'; 

import express, { Express} from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import routes from './routes/indexRoutes';

dotenv.config();
//DB IMPORT
import {mongoDbConnection,postgreConnection} from './config/db/dbHandler'; // Importa la funzione di connessione a MongoDB


const app: Express = express();

const port = process.env.PORT || 3000;
import { errorHandler } from './middlewares/errorHandler';

// Applica helmet per la sicurezza
app.use(helmet());

// Middleware per il parsing del corpo delle richieste in formato JSON
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);
// Configura Swagger UI solo in ambiente di sviluppo
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const swaggerUi = require('swagger-ui-express');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const swaggerDocument = require('../swagger.json');


  app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
// Funzione per avviare il server dopo aver stabilito le connessioni ai DB
const startServer = async () => {
  try {
    await mongoDbConnection.connectDB();
    await postgreConnection.connectDB();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    }).on('error', (error) => {
      throw new Error(error.message);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

// Middleware per il routing

// Avvio del server
startServer();


