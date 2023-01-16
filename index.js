import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express';
import routes from './routes/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import auth from './routes/authRouter.js'
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use('/apishka', auth)

app.use('/apishka', routes)






app.listen(process.env.SERVER_PORT, () => {
  console.log('server started on port ' + process.env.SERVER_PORT);
})