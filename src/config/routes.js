import Loadable from 'react-loadable'
import { Spin } from 'antd'
import withErrorBoundary from '../containers/error-boundary/'
import NotMatch from '../Components/notmatch'

//分割路由代码 让用户按需加载组件
const Home = Loadable({
  loader: () => import('../Components/home'),
  loading: Spin 
})

const Login = Loadable({
  loader: () => import('../containers/login'),
  loading: Spin
})

const Categories = Loadable({
  loader: () => import('../containers/categories'),
  loading: Spin
})

const Product = Loadable({
  loader: () => import('../Components/product'),
  loading: Spin
})

const ProductForm = Loadable({
  loader: () => import('../Components/product/product-form'),
  loading: Spin
})

const ProductDetail = Loadable({
  loader: () => import('../Components/product/product-detail'),
  loading: Spin
})

const User = Loadable({
  loader: () => import('../containers/user'),
  loading: Spin
})

const Role = Loadable({
  loader: () => import('../containers/role'),
  loading: Spin
})

const Bar = Loadable({
  loader: () => import('../Components/charts/bar'),
  loading: Spin
})

const LineChart = Loadable({
  loader: () => import('../Components/charts/line'),
  loading: Spin
})

const Pie = Loadable({
  loader: () => import('../Components/charts/pie'),
  loading: Spin
})






export const AuthRoutes = [
  {
    path: '/',
    component: withErrorBoundary(Home),
    exact: true
  },
  {
    path: '/categories',
    component: withErrorBoundary(Categories),
    exact: true
  },
  {
    path: '/product',
    component: withErrorBoundary(Product),
    exact: true
  },
  {
    path: '/product/add',
    component: withErrorBoundary(ProductForm),
    exact: true
  },
  {
    path: '/product/update/:id',
    component: withErrorBoundary(ProductForm),
    exact: true
  },
  {
    path: '/product/:id',
    component: withErrorBoundary(ProductDetail),
    exact: true
  },
  {
    path: '/user',
    component: withErrorBoundary(User),
    exact: true
  },
  {
    path: '/role',
    component: withErrorBoundary(Role),
    exact: true
  },
  {
    path: '/charts/bar',
    component: withErrorBoundary(Bar),
    exact: true
  },
  {
    path: '/charts/pie',
    component: withErrorBoundary(Pie),
    exact: true
  },
  {
    path: '/charts/line',
    component: withErrorBoundary(LineChart),
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

