import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

const authRoutes = [
  {
    path: '/',
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ],
  },
];

export default authRoutes;