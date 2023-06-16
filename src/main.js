import '../style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { router, render } from './lib';
import HomePage from './pages/admin/AdminHome';
import AddProduct from './pages/admin/AdminAddProduct';
import UpdateProduct from './pages/admin/AdminUpdate';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import NotFoundPage from './pages/NotFound';

const app = document.querySelector('#app');

router.on('/', () => render(Home, app));
router.on('/products/:id', ({ data }) => render(() => ProductDetail(data), app));

router.on('/admin/products', () => render(HomePage, app));
router.on('/admin/products/add', () => render(AddProduct, app));
router.on('/admin/products/edit/:id', ({ data }) => render(() => UpdateProduct(data), app));

router.notFound(() => render(NotFoundPage, app));
router.resolve();