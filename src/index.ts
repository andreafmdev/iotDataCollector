import express, { Express} from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import routes from './routes/indexRoutes'; // Importa il router definito

dotenv.config();
import connectDB from './config/db/mongo'; // Importa la funzione di connessione a MongoDB
connectDB();
const app: Express = express();
const port = process.env.PORT || 3000;
// Applica helmet per la sicurezza
app.use(helmet());


// Middleware per il parsing del corpo delle richieste in formato JSON
app.use(express.json());


app.use('/api', routes);

// Configura Swagger UI solo in ambiente di sviluppo
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const swaggerUi = require('swagger-ui-express');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const swaggerDocument = require('../swagger.json');

  app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  

}

// Middleware per il routing

// Avvio del server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}).on('error', (error) => {
    throw new Error(error.message);
  });
