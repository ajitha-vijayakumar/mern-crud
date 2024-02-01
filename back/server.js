const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyparser.json());
const mongoose = require('mongoose');

const db = require('./db');
db();

const User = mongoose.model('users', {
    username: String,
    password: String,
  });
  
//node code//
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
      const user = await User.findOne({ username,password });
      if (user) {
        res.json({ status: 'success', message: 'Login successfully' });
      } else {
        res.json({ status: 'failure', message: 'Login failed' });
      }
  });

  
  app.post('/tableData', async (req, res) => {
      const users = await User.find({});
      res.json(users);
  });
  
  app.delete('/deleteUser/:userId', async (req, res) => {
    const userId = req.params.userId;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (deletedUser) {
        res.json({ status: 'success', message: 'User deleted successfully..!' });
      } else {
        res.json({ status: 'error', message: 'User not found' });
      }
  });
  app.post('/addUser', async (req, res) => {
    const { username, password } = req.body;
      const user = await User.insertMany({ username,password });
      if (user) {
        res.json({ status: 'success', message: 'User Added successfully' });
      } else {
        res.json({ status: 'failure', message: 'Failed' });
      }
  });
  app.post('/editUser', async (req, res) => {
    const {id, username, password } = req.body;
    try {
      const result = await User.updateMany({ _id: id }, { $set: { username, password } });
  
      if (result && result.nModified > 0) {
        res.json({ status: 'success', message: 'User updated successfully' });
      } else {
        res.json({ status: 'failure', message: 'User not found or no changes made' });
      }
    } catch (error) {
      res.json({ status: 'error', message: 'Failed to update user', error: error.message });
    }
  });
app.listen(8000,()=>{console.log("Node running at 8000");})

