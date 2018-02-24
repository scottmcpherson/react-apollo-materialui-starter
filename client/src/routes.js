import Home from './routes/Home'
import Signup from './routes/Signup'
import Login from './routes/Login'
import ForgotPassword from './routes/ForgotPassword'
import Sport from './routes/Sport'
import MainLayout from './layouts/MainLayout'
import LoginLayout from './layouts/LoginLayout'

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: '/',
    exact: true,
    main: Home,
    layout: MainLayout
  },
  {
    path: '/sports',
    exact: true,
    main: Sport,
    layout: MainLayout
  },
  {
    path: '/sports/:sportName',
    main: Sport,
    layout: MainLayout
  },
  {
    path: '/signup',
    main: Signup,
    layout: LoginLayout
  },
  {
    path: '/login',
    main: Login,
    layout: LoginLayout
  },
  {
    path: '/forgot-password',
    main: ForgotPassword,
    layout: LoginLayout
  }
]

export default routes
