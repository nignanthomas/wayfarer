import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRoutes from './v2/routes';
import defaultRoute from './v2/routes/default';
import swaggerDocument from './api-docs/v2/swagger.json';

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Access to any client
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH DELETE, GET');
    res.status(200).json({});
  }
  next();
});

app.use('', defaultRoute);
app.use('/api/v2/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v2', apiRoutes);

// catch 405
app.use((req, res, next) => res.status(405).json({ status: 405, error: 'Method Not Allowed!' }));

// catch 500
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ status: error.status || 500, error: error.message });
  next();
});

// eslint-disable-next-line no-console
app.listen(port);

export default app;
