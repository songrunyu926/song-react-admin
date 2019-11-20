
import Home from '../Components/home'
import Login from '../containers/login'
import NotMatch from '../Components/notmatch'

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: true
  },

  {
    component: NotMatch  //必须是最后一个
  }
]
