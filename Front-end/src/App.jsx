import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/admin/dashboard'
import AdminLayout from './pages/admin/layout'
import AdminManageAccounts from './pages/admin/accounts'
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
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<SignIn />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='otp-confirmation' element={<OtpConfirmation />}/>
        </Route>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="accounts" element={<AdminManageAccounts />} />
          <Route path="sections" element={<AdminManageSections />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App