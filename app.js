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
  project: {
    type: String,
    required: true,
  },
  webDesignProject: {
    type: String,
  },
  graphicDesignProject: {
    type: Array,
  },
  nbo_webDesignProject: {
    type: String,
  },
  nbo_graphicDesignProject: {
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
    project: req.body.project,
    webDesignProject: req.body.web_design || null,
    graphicDesignProject: req.body.graphic_design || null,
    nbo_webDesignProject: req.body.web_design__nbo || null,
    nbo_graphicDesignProject: req.body.graphic_design__nbo || null,
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
