import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from './pages/admin/dashboard'
import AdminLayout from './pages/admin/layout'
import AdminManageAccountLayout from './pages/admin/accounts/layout'
import AdminManageSections from './pages/admin/sections'
import AdminAnnouncements from './pages/admin/announcements'
import TeacherLayout from './pages/teacher/layout'
import TeacherDashboard from './pages/teacher/dashboard'
import TeacherManageAccountLayout from './pages/teacher/accounts/layout'
import TeacherAssignedSections from './pages/teacher/sections'
import TeacherAnnouncements from './pages/teacher/announcements'
import SignIn from './pages/auth/login'
import AuthLayout from './pages/auth/layout'
import OtpConfirmation from './pages/auth/otp-confirmation'
import ResetPassword from './pages/auth/reset-password'
import PrivateRoute from './utils/private-route'
import AuthRoute from './utils/auth-route'  // Import the new AuthRoute
import { RoleId } from './utils/roleId'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route index element={<Navigate to="/auth" replace />} />

        {/* Authentication Routes - Now wrapped with AuthRoute */}
        <Route element={<AuthRoute />}>
          <Route path='/auth' element={<AuthLayout />}>
            <Route index element={<Navigate to="/auth/login" replace />} />
            <Route path='login' element={<SignIn />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='otp-confirmation' element={<OtpConfirmation />} />
          </Route>
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={[RoleId.ADMIN]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="accounts" element={<AdminManageAccountLayout />} />
            <Route path="sections" element={<AdminManageSections />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
          </Route>
        </Route>

        {/* Protected Teacher Routes */}
        <Route element={<PrivateRoute allowedRoles={[RoleId.TEACHER]} />}>
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<Navigate to="/teacher/dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="accounts" element={<TeacherManageAccountLayout />} />
            <Route path="sections" element={<TeacherAssignedSections />} />
            <Route path="announcements" element={<TeacherAnnouncements />} />
          </Route>
        </Route>

        {/* Add an Unauthorized Route */}
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App