const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbconfig');
const { join, resolve } = require('path');
const http = require('http');
_ = require("underscore");

const app = express();

app.use(express.json());

app.use(cors());
app.use(cookieParser());
app.use(session({
    secret: 'delivery@&beverage@#',
    resave: true,
    saveUninitialized: true
}));

global.appRoot = join(__dirname, '/');
config = require(resolve(join(__dirname, '/config', 'index')));
global.project_name = config.app.project_name;

const getPort = config.app.getPort;

/***************  Swagger API DOC ***************/
const swaggerAdmin = require(resolve(join(__dirname, 'helper', 'swagger')));
app.use('/', swaggerAdmin.router);
/************************************************/

const user = require('./routes/user.routes');
const course = require('./routes/course.routes');
const course_assign = require('./routes/course_assign.routes');
const submitted_exams = require('./routes/submitted_exam.routes');
const exam = require('./routes/exam.routes');

connectDB();

dotenv.config({ path: './config/config.env' });

global.BASE_URL = `http://${process.env.HOST}:${getPort}`;

app.use('/api', user);
app.use('/api', course);
app.use('/api', exam);
app.use('/api', course_assign);
app.use('/api', submitted_exams);

const server = http.createServer(app);
server.listen(getPort);
console.log(`Server is running on ${(global.BASE_URL && global.BASE_URL !== '') ? global.BASE_URL : `http://${process.env.HOST}:${getPort}`}`);