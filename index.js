import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import shapeRoute from './src/routes/shape.js'
import userRoutes from './src/routes/user.js'
import colorRoute from './src/routes/color.js'
import designRoute from './src/routes/design.js'
import postRoute from './src/routes/post.js'

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(cors());
app.use('/shapes', shapeRoute);
app.use('/colors', colorRoute);
app.use('/user', userRoutes);
app.use('/designs', designRoute);
app.use('/posts', postRoute);


const CONNECTION_URL = "mongodb+srv://vadaszbence:EDpvmmkb439qYee@cluster0.x44no.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) )
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);