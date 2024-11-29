import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/admin/dashboard'
import AdminLayout from './pages/admin/layout'
import AdminManageAccounts from './pages/admin/accounts'
import AdminManageSections from './pages/admin/sections'
import AdminAnnouncements from './pages/admin/announcements'

function App() {

  return (
    <BrowserRouter>
      <Routes>
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