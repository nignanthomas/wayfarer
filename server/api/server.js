import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import apiRoutes from './v1/routes';
import swaggerDocument from './api-docs/v1/swagger.json';
import tokenGenerator from './v1/helpers/signToken';

const app = express();
const port = process.env.PORT || 3000;

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

app.get('/get-token', (req, res) => {
  const token = tokenGenerator.signToken({
    id: 1,
    email: 'nignanthomas@gmail.com',
    first_name: 'Thomas',
    last_name: 'Nignan',
    password: 'qwerty',
    is_admin: true,
  });
  res.send({ token });
});

app.get('/', (req, res) => res.status(200).send({ message: "Bienvenue, this is WayFarer's!!!" }));

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', apiRoutes);
app.use('*', (req, res) => res.status(404).json({ message: 'Oops! Please visit https://wayfarer-adc-nthomas.herokuapp.com/api/v1/api-docs/ for documentation.' }));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server is running on port ${port}...`));

export default app;
