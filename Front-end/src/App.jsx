import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboardLayout from './pages/admin/dashboard/layout'
import AdminLayout from './pages/admin/layout'
import AdminManageAccountsLayout from './pages/admin/accounts/layout'
import AdminManageSectionsLayout from './pages/admin/sections/SectionsManagement'
import AdminSectionDetails from './pages/admin/sections/SectionDetails'
import AdminAnnouncements from './pages/admin/announcements'
import TeacherLayout from './pages/teacher/layout'
import TeacherDashboard from './pages/teacher/dashboard'
import TeacherSectionsManagement from './pages/teacher/sections/layout'
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
            <Route path="dashboard" element={<AdminDashboardLayout />} />
            <Route path="accounts" element={<AdminManageAccountsLayout />} />
            <Route path="sections" element={<AdminManageSectionsLayout />} />
            <Route path="sections/:schoolYear/:semester/:sectionId" element={<AdminSectionDetails />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
          </Route>
        </Route>

        {/* Protected Teacher Routes */}
        <Route element={<PrivateRoute allowedRoles={[RoleId.TEACHER]} />}>
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<Navigate to="/teacher/dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="sections" element={<TeacherSectionsManagement />} />
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
