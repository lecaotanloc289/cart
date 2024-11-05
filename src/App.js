import './App.css';
import Cart from './page/Cart.jsx';
import Product from './page/Product';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:  <Product/>,
    },
    {
      path: '/cart',
      element: <Cart/>
    }
  ]);
  return (<RouterProvider router={router} />);
}

export default App;


