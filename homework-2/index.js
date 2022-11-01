//
// TASK 2 (Task 2.1, Task 2.2)
//


// const Joi = require('joi');
import Joi from 'joi';
// const express = require('express');
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(express.json());


//
// Test users list
//
const users = [
  {
    "id": "718dcd31-9fa4-4517-8e78-2556f6b3df29", // it was "id":1,
    "login": "user1",
    "password": "pass1",
    "age": 10,
    "isDeleted": "false"
  },
  {
    "id": "645b1056-d72c-4eda-bc48-fb4f8365136d", // it was "id":2,
    "login": "user2",
    "password": "pass2",
    "age": 20,
    "isDeleted": "false"
  },
  {
    "id": "cb8ed75b-05e9-4f1b-9b82-c4eebeb8620d", // it was "id":3,
    "password": "pass3",
    "age": 30,
    "isDeleted": "false"
  }
]


//
// Get Homepage
//
app.get('/', (req, res) => {

  res.send('<h2>Homework 2: Task 2.1, Task 2.2</h2>');

});


//
// Get all users
//
app.get('/api/users', (req, res) => {

  res.send(users);

});


//
// Get one user by ID
//
app.get('/api/users/:id', (req, res) => {

  const user = users.find((user) => user.id === req.params.id);

  if (!user) {
    res.status(404).send('The user with the given ID was not found');
    return
  }

  res.send(user);

});


//
// Create new user
//
app.post('/api/users', (req, res) => {

  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const user = {
    id: uuidv4(),
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
    isDeleted: req.body.isDeleted
  }

  users.push(user);

  res.send(user);

});


//
// Update user
//
app.put('/api/users/:id', (req, res) => {

  const user = users.find((user) => user.id === req.params.id);

  if (!user) {
    res.status(404).send('The user with the given ID was not found');
    return;
  }

  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  user.login = req.body.login,
  user.password = req.body.password,
  user.age = req.body.age,
  user.isDeleted = req.body.isDeleted

  res.send(user);

});


//
// Mark user as deleted
//
app.patch('/api/users/:id', (req, res) => {

  const user = users.find((user) => user.id === req.params.id);

  if (!user) {
    res.status(404).send('The user with the given ID was not found');
    return;
  }

  user.isDeleted = req.body.isDeleted;
  // res.send(user);

  const usersList = users.filter((user) => user.id !== req.params.id);
  res.send(usersList);

  console.log(`User with id ${user.id} has been deleted`);

});


//
// Validation schema
//
function validateUser(user) {
  const schema = Joi.object({
    login: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).alphanum().required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
  });
  return schema.validate(user);
}


//
// Run local server
//
const PORT = 3000;
app.listen(PORT, () => console.log(`Server has started on localhost:${PORT}`));

