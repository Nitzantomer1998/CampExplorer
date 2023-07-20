import fs from 'fs';
import dotenv from 'dotenv';
import express from 'express';
import ejsMate from 'ejs-mate';
import flash from 'connect-flash';
import session from 'express-session';
import methodOverride from 'method-override';
import mongodbConfig from './configs/mongodbConfig.js';

dotenv.config();

await mongodbConfig();

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + parseInt(process.env.EXPIRATION_TIME),
    },
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user_id;
  res.locals.msg = req.flash('msg')[0];
  next();
});

fs.readdirSync('./src/routes').forEach(async (route) =>
  app.use('/', (await import(`./routes/${route}`)).default)
);

app.use((error, req, res, next) => {
  const { statusCode = 404, message = 'Page Not Found' } = error;
  res.render('error', { error });
});

app.listen(process.env.PORT, () => console.log('Server Connected'));
