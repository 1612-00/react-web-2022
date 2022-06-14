import './assets/libs/boxicons-2.1.1/css/boxicons.min.css';
import './scss/app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import BlankPage from './pages/BlankPage';
import Note from './pages/note/Note';
import Login from './pages/authorization/Login';
import Product from './pages/product/Product';
import Register from './pages/authorization/Register';
import ResetPassword from './pages/authorization/ResetPassword';
import Profile from './pages/profile/Profile';
import AddProduct from './pages/product/addProduct/AddProduct';
import OrdersProduct from './pages/product/ordersProduct/OrdersProduct';
import Checkout from './pages/product/checkout/Checkout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth/login' element={<Login />} />
                <Route path='/auth/register' element={<Register />} />
                <Route path='/auth/reset-password' element={<ResetPassword />} />
                <Route path='/' element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='/apps/notes' element={<Note />} />
                    <Route path='/apps/chat' element={<BlankPage />} />
                    <Route path='/apps/contacts' element={<BlankPage />} />
                    <Route path='/product' element={<Product />} />
                    <Route path='/product/add' element={<AddProduct />} />
                    <Route path='/product/orders' element={<OrdersProduct />} />
                    <Route path='/product/checkout' element={<Checkout />} />
                    <Route path='/profile' element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
