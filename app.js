const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'order-a-project',
});

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
  const name = req.body.name;
  const email = req.body.email;
  const project = req.body.project;
  const webDesignProject = req.body.web_design;
  const graphicDesignProject = req.body.graphic_design;
  const nbo_webDesignProject = req.body.web_design__nbo;
  const nbo_graphicDesignProject = req.body.graphic_design__nbo;

  if (project === 'web-design') {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log('Connected');

      let sql = `INSERT INTO projects (name, email, project, project_type) VALUES ('${name}', '${email}', '${project}', '${webDesignProject}')`;
      connection.query(sql, (err, result) => {
        connection.release();
        if (!err) {
          console.log('Inserted');
        } else {
          console.log(err);
        }
      });
    });
  } else if (project === 'graphic-design') {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log('Connected');

      let sql = `INSERT INTO projects (name, email, project, project_type) VALUES ('${name}', '${email}', '${project}', '${graphicDesignProject}')`;
      connection.query(sql, (err, result) => {
        connection.release();
        if (!err) {
          console.log('Inserted');
        } else {
          console.log(err);
        }
      });
    });
  } else {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log('Connected');

      let sql = `INSERT INTO projects (name, email, project, project_type) VALUES ('${name}', '${email}', '${project}', '${nbo_webDesignProject} ${nbo_graphicDesignProject}')`;
      connection.query(sql, (err, result) => {
        connection.release();
        if (!err) {
          console.log('Inserted');
        } else {
          console.log(err);
        }
      });
    });
  }

  setTimeout(() => {
    res.redirect('/');
  }, 3500);
});

let port = process.env.PORT;
if (port == null || port == '') {
  port = 8000;
}
app.listen(port);
