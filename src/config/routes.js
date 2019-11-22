
import Home from '../Components/home'
import Login from '../containers/login'
import NotMatch from '../Components/notmatch'



export const AuthRoutes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    component: NotMatch  //必须是最后一个
  }
]

export const noAuthRoutes = [
  {
    path: '/login',
    component: Login,
    exact: true
  },
]

