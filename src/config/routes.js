
import Home from '../Components/home'
import Login from '../containers/login'
import NotMatch from '../Components/notmatch'
import Categories from '../containers/categories'
import Product from '../Components/product'
import AddProductForm  from '../Components/product/add-product-form'
import UpdateProductForm from '../Components/product/update-product-form'



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
    component: AddProductForm,
    exact: true
  },
  {
    path: '/product/update',
    component: UpdateProductForm,
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

