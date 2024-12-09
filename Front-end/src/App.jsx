import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from './pages/admin/dashboard'
import AdminLayout from './pages/admin/layout'
import AdminManageAccountLayout from './pages/admin/accounts/layout'
import AdminManageSections from './pages/admin/sections'
import AdminAnnouncements from './pages/admin/announcements'
import SignIn from './pages/auth/login'
import AuthLayout from './pages/auth/layout'
import OtpConfirmation from './pages/auth/otp-confirmation'
import ResetPassword from './pages/auth/reset-password'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes */}
        <Route index element={<Navigate to="/auth" replace />} />
        <Route path='/auth' element={<AuthLayout />}>
          <Route index element={<Navigate to="/auth/login" replace />} />
          <Route path='login' element={<SignIn />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='otp-confirmation' element={<OtpConfirmation />}/>
        </Route>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="accounts" element={<AdminManageAccountLayout />}/>
          <Route path="sections" element={<AdminManageSections />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App