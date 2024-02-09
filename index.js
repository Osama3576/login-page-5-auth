import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

///////////////////////// Middlewares ///////////////////////////

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(morgan('tiny'));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(passport.session());

//////////////////////////////// Mongoose and Database setup //////////////////////////////////

mongoose.set('strictQuery', true);

mongoose.connect(
  'mongodb+srv://codegeeks143:codegeeks@cluster0.3nurr8e.mongodb.net/logindb4?retryWrites=true',
  err => {
    if (err) console.log(err);
    console.log('connection successful to Mongo db');
  }
);

//Creating User Sechema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const userModel = new mongoose.model('User', userSchema);

//////////////////////////////////////////////// Routes Setup ********************************

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next();
    res.redirect('/login');
  });
});

app.get('/secretpage', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(__dirname + '/public/secret.html');
  } else {
    res.redirect('/login');
  }
});

app.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).send({ message: 'You are logged in' });
  } else {
    return res.status(401).send({ message: 'You are not logged in' });
  }
});

app.post(
  '/login/pasword',
  passport.authenticate('local', {
    successRedirect: '/secretpage',
    failureRedirect: '/login',
  })
);

app.post('/signup', async (req, res) => {
  const userName = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = new userModel({
      name: userName,
      email: email,
      password: hashedPassword,
    });

    newUser.save(err => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).redirect('/login');
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({ message: 'Please fill all fields' });
  }
});

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    userModel.findOne({ email: username }, async (err, user) => {
      if (err) return cb(err);

      if (!user) {
        return cb(null, false, {
          message: 'Invalid username',
        });
      }

      bcrypt.compare(password, user.password, (err, valid) => {
        if (err) return cb(err);

        if (!valid) {
          return cb(null, false, {
            message: 'Invalid password',
          });
        }

        return cb(null, user);
      });
    });
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

///////////////////////////////////////////////////////////////

app.listen(5500, () => {
  console.log('Server is running on Port 5500');
});
