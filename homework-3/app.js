const pool = require('./data-access/connection.js')
const express = require('express');
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

const app = express();

app.use(bodyParser.json());

pool.connect();


//
// Run local server
//
const PORT = 3000;
app.listen(PORT, () => console.log(`Server has started on localhost:${PORT}`));


//
// Get Homepage
//
app.get('/', (req, res) => {

  res.send('<h2>Homework 3</h2>');

});


//
// Get all users
//
app.get('/users', (req, res) => {

  const selectAllQuery = 'SELECT user_id, login, password, age FROM users WHERE isdeleted = false ORDER BY db_id ASC';

  pool.query(selectAllQuery, (error, result) => {
    if (error) {
      throw error.message;
    }
    res.send(result.rows);
  });

  pool.end;

})


//
// Get user by ID
//
app.get('/users/:id', (req, res) => {

  const selectByIdQuery = `SELECT user_id, login, password, age FROM users WHERE user_id='${req.params.id}' AND isdeleted = false`;

  pool.query(selectByIdQuery, (error, result) => {
    if (error) {
      throw error.message;
    }
    if (result.rowCount === 0) {
      res.status(404).send(`User is not found. ID:${req.params.id}`);
      return
    }
    else {
      res.send(result.rows);
    }
  });

  pool.end;

})


//
// Create new user
//
app.post('/users', (req, res) => {

  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const user = req.body;
  const uniqUserID=uuidv4();
  let insertQuery = `INSERT INTO users (user_id, login, password, age, isdeleted)
                     VALUES ('${uniqUserID}', '${user.login}', '${user.password}', '${user.age}', false)`;

  pool.query(insertQuery, (error, result) => {
    if (error) {
      throw error.message;
    }
    else {
      res.send(`User is added. ID:${uniqUserID}`);
    }
  })

  pool.end;

})


//
// Update user by ID
//
app.put('/users/:id', (req, res) => {

  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let user = req.body;
  let updateQuery = `UPDATE users
                     SET login = '${user.login}',
                     password = '${user.password}',
                     age = ${user.age},
                     isdeleted = false
                     WHERE user_id = '${req.params.id}' AND isdeleted = false`;

  pool.query(updateQuery, (error, result) => {

    if (error) {
      throw error.message;
    }
    if (result.rowCount === 0) {
      res.status(404).send(`User is not found. ID:${req.params.id}`);
      return
    }
    else {
      res.send(`User is  updated. ID:${req.params.id}`)
    }

  })

  pool.end;

});


//
// Mark user as deleted
//
app.delete('/users/:id', (req, res) => {

  let user = req.body;
  let markAsDeleteQuery = `UPDATE users SET isdeleted = ${user.isdeleted} WHERE user_id = '${req.params.id}' AND isdeleted = false`;

  pool.query(markAsDeleteQuery, (error, result) => {

      if (error) {
        throw error.message;
      }
      if (result.rowCount === 0) {
        res.status(404).send(`User is not found. ID:${req.params.id}`);
        return
      }
      else {
        res.send(`User marked as deleted. ID:${req.params.id}`)
      }

  })

  pool.end;

});


//
// Validation schema
//
function validateUser(user) {
  const schema = Joi.object({
    login: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).alphanum().required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isdeleted: Joi.boolean().required()
  });
  return schema.validate(user);
}

