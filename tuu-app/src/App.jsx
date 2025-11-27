import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';
import TutorProfilePage from './pages/TutorProfilePage';
import TutorManagementPage from './pages/TutorManagementPage';

// Auth Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import StudentLogin from './components/auth/StudentLogin';
import StudentRegistration from './components/auth/StudentRegistration';
import TutorLogin from './components/auth/TutorLogin';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';

// Pages
import StudentDashboard from './pages/StudentDashboard';
import StudentHomePage from './pages/StudentHomePage';
import AdminDashboard from './pages/AdminDashboard';
import TutorBookingsPage from './pages/TutorBookingsPage';
import StudentBookingsPage from './pages/StudentBookingsPage';
import StudentFindTutors from './pages/StudentFindTutors';
import StudentProfilePage from './pages/StudentProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <AuthProvider>
        <Router>
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          
          
          {/* Student Routes */}
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/register" element={<StudentRegistration />} />
          <Route path="/student/home" element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentHomePage />
            </ProtectedRoute>
          } />
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/student/bookings" element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentBookingsPage />
            </ProtectedRoute>
          } />
          <Route path="/student/search-tutors" element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentFindTutors />
            </ProtectedRoute>
          } />
          <Route path="/student/profile" element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentProfilePage />
            </ProtectedRoute>
          } />
          
          {/* Tutor Routes */}
          <Route path="/tutor/login" element={<TutorLogin />} />
          <Route path="/tutor/dashboard" element={
            <ProtectedRoute allowedRoles={['TUTOR']}>
              <TutorProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/tutor/bookings" element={
            <ProtectedRoute allowedRoles={['TUTOR']}>
              <TutorBookingsPage />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Protected Profile Routes */}
          <Route path="/student/profile" element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentHomePage />
            </ProtectedRoute>
          } />
          
          {/* Admin Management Routes */}
          <Route path="/admin/tutor-management" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <TutorManagementPage />
            </ProtectedRoute>
          } />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;
