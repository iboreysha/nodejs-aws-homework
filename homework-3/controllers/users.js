const pool = require('../data-access/connection.js');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

pool.connect();


//
// Get all users
//
const getUsers = (req, res) => {

  const selectAllQuery = 'SELECT user_id, login, password, age FROM users WHERE isdeleted = false ORDER BY db_id ASC';

  pool.query(selectAllQuery, (error, result) => {
    if (error) {
      throw error.message;
    }
    res.send(result.rows);
  });

}
exports.getUsers = getUsers;


//
// Get user by ID
//
const getUserByID = (req, res) => {

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

};
exports.getUserByID = getUserByID;


//
// Create new user
//
const createUser = (req, res) => {

  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const user = req.body;
  const uniqUserID = uuidv4();
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

};
exports.createUser = createUser;


//
// Update user by ID
//
const updateUser = (req, res) => {

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

};
exports.updateUser = updateUser;


//
// Mark user as deleted
//
const deleteUser = (req, res) => {

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

};
exports.deleteUser = deleteUser;


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

