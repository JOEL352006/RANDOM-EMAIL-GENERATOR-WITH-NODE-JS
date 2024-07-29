const express = require('express');
const randomString = require('randomstring');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// In-memory "database" for emails
const inbox = {};

// Generate random email
app.get('/generate-email', (req, res) => {
  const email = `${randomString.generate(10)}@gmail.com`;
  inbox[email] = [];
  res.json({ email });
});

// Send OTP to the random email (for demonstration purposes)
app.get('/send-otp', (req, res) => {
  const email = req.query.email;
  if (!inbox[email]) {
    return res.status(404).json({ error: 'Email not found' });
  }

  const otp = randomString.generate({ length: 6, charset: 'numeric' });
  inbox[email].push(`Your OTP is: ${otp}`);
  res.json({ message: 'OTP sent' });
});

// Retrieve inbox messages
app.get('/inbox', (req, res) => {
  const email = req.query.email;
  if (!inbox[email]) {
    return res.status(404).json({ error: 'Email not found' });
  }

  res.json({ messages: inbox[email] });
});

// Serve the random.html file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'random.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
