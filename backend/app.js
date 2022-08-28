const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');
const { loginValidator, createUserValidator } = require('./middlewares/validators');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();
const allowedCors = [
  'localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(bodyParser.json());

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Origin', '*');
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.post('/signin', loginValidator, login);
app.post('/signup', createUserValidator, createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
