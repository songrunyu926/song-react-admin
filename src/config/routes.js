
import Home from '../Components/home'
import Login from '../containers/login'
import NotMatch from '../Components/notmatch'
import Categories from '../containers/categories'
import Product from '../Components/product'
import ProductForm  from '../Components/product/product-form'
import ProductDetail from '../Components/product/product-detail'
import User from '../containers/user'
import Role from '../containers/role'



export const AuthRoutes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/categories',
    component: Categories,
    exact: true
  },
  {
    path: '/product',
    component: Product,
    exact: true
  },
  {
    path: '/product/add',
    component: ProductForm,
    exact: true
  },
  {
    path: '/product/update/:id',
    component: ProductForm,
    exact: true
  },
  {
    path: '/product/:id',
    component: ProductDetail,
    exact: true
  },
  {
    path: '/user',
    component: User,
    exact: true
  },
  {
    path: '/role',
    component: Role,
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

