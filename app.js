const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postController = require('./controllers/postsController');
const pageController = require('./controllers/pageController');

const app = express();

//Connect DB
mongoose
  .connect('mongodb://localhost/blog2-test-db')
  .then(() => {
    console.log('DB Connected!');
  })
  .catch((err) => {
    console.log(err);
  });

//Template Engine
app.set('view engine', 'ejs');

//MiddleWares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['GET', 'POST'],
  })
);
//Routing
app.get('/', postController.getAllPosts); //Show all Posts in main page
app.get('/posts/:id', postController.getPost); //Get Post Page
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost); //Update Post Page
app.delete('/posts/:id', postController.deletePost); //Delete Post Request

app.get('/add', pageController.getAddPage);
app.get('/about', pageController.getAboutPage);
app.get('/posts/edit/:id', pageController.getEditPage);

const port = 3000;

app.listen(port, () => {
  console.log(`Server Running On Port ${port}....`);
});
