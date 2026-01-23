const jsonServer = require('json-server');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const server = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(express.json());
server.use(middlewares);

const SECRET = 'committee_secret_key';

// Login route
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = router.db.get('users').value();
  const user = users.find(u => u.username === username);

  if (!user) return res.status(401).json({ message: 'User not found' });
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token, role: user.role });
});

// Middleware for protected routes
server.use((req, res, next) => {
  if (req.path.startsWith('/members') || req.path.startsWith('/deposits') || req.path.startsWith('/users')) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, SECRET);
      if (req.path.startsWith('/users') && decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }
      next();
    } catch {
      return res.status(403).json({ message: 'Invalid token' });
    }
  } else {
    next();
  }
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server running on port 3001');
});
