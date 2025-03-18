const express=require('express');  //This is external router
const path=require('path');

// const RootDir=require('./utils/pathUtils');

const bodyParser = require('body-parser');
const errorControllers = require('./controllers/errors');




const storeRouter = require("./Routes/StoreRouter");
const hostRouter = require("./Routes/hostRouter");

const app=express();
app.set('view engine','ejs');
app.set('views','views');

// app.use(express.static(path.join(RootDir,'public')));

app.use(express.urlencoded());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(storeRouter);
app.use(hostRouter);

app.use(errorControllers.Errorhandling);

const port=3001;

app.listen(port,()=>{
  console.log(`The app is running on http://localhost:${port}`);
})



