require ('dotenv').config()
require ("./models/connection")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { checkBody } = require('./modules/checkBody');
const User = require('./models/users');
const express = require('express')
const cors = require('cors');

const app = express()

app.use(cors());
const port = 3000

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

var ingredientsRouter = require('./routes/ingredients');
var ingredientscategoriesRouter = require('./routes/ingredientscategories');
var mesuresRouter = require('./routes/mesures');
var recipesRouter = require('./routes/recipes');
var recipescategoriesRouter = require('./routes/recipescategories');
var regimesRouter = require('./routes/regimes');
// var protectedRouter = require('./routes/protected');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', userRouter);

app.use('/ingredients', ingredientsRouter);
app.use('/ingredientscategories', ingredientscategoriesRouter);
app.use('/mesures', mesuresRouter);
app.use('/recipes', recipesRouter);
app.use('/recipescategories', recipescategoriesRouter);
app.use('/regimes', regimesRouter);
// app.use('/protected', protectedRouter);



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})