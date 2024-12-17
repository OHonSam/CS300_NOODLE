// Back-end/src/routes/index.js
const authRoutes = require('./auth');
const studentRoutes = require('./student');
const teacherRoutes = require('./teacher');
const adminRoutes = require('./admin');

function route(app) {
  app.use('/api/auth', authRoutes);
  app.use('/api/student', studentRoutes);
  app.use('/api/teacher', teacherRoutes);
  app.use('/api/admin', adminRoutes);
}

module.exports = route;