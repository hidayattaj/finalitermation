const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();


// Database connection and initialization
const Song = require("./model/Song");
const connectDB = require("./db");
connectDB();


// Sets up static files routing
app.use(express.static('public'));
app.use('/css', express.static(__dirname+'public/css'));
app.use('/js', express.static(__dirname+'public/js'));
app.use('/img', express.static(__dirname+'public/img'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set('view engine', 'ejs');


// Displays home page
app.get('/', (req, res)=> {
  res.render('index');
});


// Displays producer page
app.get('/producer', async (req, res)=> {
  
  try {
    res.render('producer');
  } catch (error) {
    console.log(error);
  }

});



app.post('/producer', async (req, res) => {

  try {
    const data = await Song.find( { title: req.body.title });
    if (data.length === 0) {
      res.send(JSON.stringify("not_found"));
    } else {
      res.send(data[0]);
    }
  } catch (error) {
    console.log(error);
  }
  
});




// Displays songs page
app.get('/songs-page', async (req, res)=> {

  try {
    const data = await Song.find();
    res.render('songs-page', { data });
  } catch (error) {
    console.log(error);
  }

});




app.listen(5000,()=> console.log('Server Connected'));