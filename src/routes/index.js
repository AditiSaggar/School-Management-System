const express = require('express');
const rootRouter = express.Router();
const school = require('../routes/schoolRoute');


rootRouter.use('/school',school)


module.exports = rootRouter

