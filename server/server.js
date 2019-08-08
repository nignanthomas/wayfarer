import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRoutes from './v1/routes';
import defaultRoute from './v1/routes/default';
import swaggerDocument from './api-docs/v1/swagger.json';

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
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', apiRoutes);
app.use('*', (req, res) => res.status(404).json({ status: 404, error: 'Route does not exist! or Method Not Allowed!' }));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server is running on port ${port}...`));

export default app;