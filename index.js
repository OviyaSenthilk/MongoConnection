require('dotenv').config(); // Load environment variables
  const express = require('express');
  const mongoose = require('mongoose');
  const app = express();
  
  app.use(express.json());
  
  // MongoDB connection
  // const uri = process.env.MONGO_URI;
  // mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  //   .then(() => console.log('Connected to MongoDB Atlas'))
  //   .catch(err => console.error('Connection failed:', err));
  const uri = process.env.MONGO_URI;
   mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Connection failed:', err));

  
  // Sample Mongoose Schema and Model
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
  });
  const User = mongoose.model('User', userSchema);
  
  // Create a new user
  app.post('/users', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // Get all users
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      console.log('Users:', users);
      res.send(users);
    } catch (err) {
      console.error('Error in GET /users:', err);
      res.status(500).send(err);
    }
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  