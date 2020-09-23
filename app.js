const express = require('express');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes/index');
const { PORT, DATABASE } = require('./clobalconst');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { ErrorMiddleware } = require('./middlewares/error');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(ErrorMiddleware);

app.listen(PORT);
