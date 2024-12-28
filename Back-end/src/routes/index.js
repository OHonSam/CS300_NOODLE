// Back-end/src/routes/index.js
const authRoutes = require('./auth');
const studentRoutes = require('./student');
const teacherRoutes = require('./teacher');
const adminRoutes = require('./admin');
const materialRoutes = require('./material');

function route(app) {
  app.use('/api/auth', authRoutes);
  app.use('/api/student', studentRoutes);
  app.use('/api/teacher', teacherRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/material', materialRoutes);
}

module.exports = route;