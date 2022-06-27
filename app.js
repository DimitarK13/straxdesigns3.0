const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://dimiK:DimitarK@cluster0.btp64.mongodb.net/orderAproject'
);

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
  },
  project: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  logo: {
    type: String,
  },
  graphicDesign: {
    type: Array,
  },
  nbo: {
    type: Array,
  },
});

const Project = mongoose.model('Project', projectSchema);

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Strax Designs' });
});

app.get('/web-design', (req, res) => {
  res.render('web-design', { title: 'Web Design | Strax Designs' });
});

app.get('/graphic-design', (req, res) => {
  res.render('graphic-design', { title: 'Graphic Design | Strax Designs' });
});

app.get('/nbo', (req, res) => {
  res.render('nbo', { title: 'New Business Offer | Strax Designs' });
});

app.get('/order-a-project', (req, res) => {
  res.render('order-a-project', { title: 'Order a Project | Strax Designs' });
});

app.get('/projects', (req, res) => {
  res.render('projects', { title: 'Projects | Strax Designs' });
});

app.get('/terms-of-use', (req, res) => {
  res.render('terms-of-use', { title: 'Terms of Use | Strax Designs' });
});

app.post('/', (req, res) => {
  const newProject = new Project({
    name: req.body.name,
    email: req.body.email,
    discount: req.body.discount,
    project: req.body.project,
    website: req.body.website || null,
    logo: req.body.logo || null,
    graphicDesign: req.body.graphic_design || null,
    nbo: req.body.nbo || null,
  });

  newProject.save();

  setTimeout(() => {
    res.redirect('/');
  }, 3500);
});

let port = process.env.PORT;
if (port == null || port == '') {
  port = 3000;
}
app.listen(port);
