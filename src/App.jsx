import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import ProductList from './components/ProductList';
// import Cart from './components/Cart';
// import AddProduct from './components/AddProduct';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './Navbar';
import Home from './Home';
import Cart from './Cart';
import ProductDetails from './ProductDetails';
import ProductUpdateForm from './Update';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/update/:id" element={<ProductUpdateForm />} />
          {/* <Route path="/add-product" element={<AddProduct />} /> */}
          {/* Add UpdateProduct route if necessary */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
