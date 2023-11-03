const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')

const { requireAuth, requireAdmin } = require('./middleware/authMiddleware');
const { errorHandlerMiddleware } = require('./middleware/errorHandlerMiddleware');


const app = express();



const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your React app's domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (e.g., cookies, authorization headers)
};
// middleware
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'your_secret_key', // Change this to a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: {
    // secure: true,   // Only send the cookie over HTTPS
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
  },
}));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://127.0.0.1:27017/authDB';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
// app.get('*', checkUser);
// app.get('/', (req, res) => res.render('home'));
// app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

app.get('/sample', (req, res) => res.status(200).send("okay"));
app.use('/auth',authRoutes)
app.use('/product', requireAuth, errorHandlerMiddleware, productRoutes)