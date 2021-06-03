import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import shapeRoute from './routes/shape.js'
import userRoutes from './routes/user.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use('/shape', shapeRoute);
app.use('/user', userRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

const CONNECTION_URL = "mongodb+srv://vadaszbence:EDpvmmkb439qYee@cluster0.x44no.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) )
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);