import fs from 'fs';
import dotenv from 'dotenv';
import express from 'express';
import ejsMate from 'ejs-mate';
import methodOverride from 'method-override';
import wrapAsync from './utils/wrapAsync.js';
import connectDB from './configs/database.js';
import ExpressError from './utils/ExpressError.js';

dotenv.config();

await connectDB();

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

fs.readdirSync('./src/routes').map(
  wrapAsync(async (route) =>
    app.use('/', (await import(`./routes/${route}`)).default)
  )
);

app.use((error, req, res, next) => {
  res.render('error', { error });
});

// app.all('*', (req, res, next) => {
//   next(new ExpressError('Page Not Found', 404));
// });

app.listen(process.env.PORT, () => console.log('Server Connected'));
