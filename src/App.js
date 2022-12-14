import { Routes, Route, Router } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from 'pages/login'
import RegisterPage from 'pages/register'
import privateRoutes from './routes/private'
import { AuthProvider } from 'contexts/auth'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="/admin" element={<Layout />}>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </AuthProvider>
  )
}
