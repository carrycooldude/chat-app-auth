// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_database_url' with your MongoDB connection string)
mongoose.connect('mongodb+srv://carrycooldude:cg13ua1834@task-manager.xdvaniv.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const User = mongoose.model('User', userSchema);
console.log(User);

// JWT Secret Key (replace 'your_secret_key' with your secret key)
const secretKey = process.env.SECRET_KEY || 'fallback-secret-key';

// Authentication Middleware
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    console.log(user);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Messages Endpoint (protected)
app.get('/api/messages', authenticateUser, (req, res) => {
  // Fetch messages from the database based on user role
  // ...

  // For simplicity, just return a sample response
  res.json([
    { text: 'Hello', user: 'user1' },
    { text: 'Hi there!', user: 'user2' },
  ]);
});

app.post('/api/messages', authenticateUser, (req, res) => {
  // Save new message to the database
  // ...

  // For simplicity, just return success
  res.json({ message: 'Message sent successfully' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
