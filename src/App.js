import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddProductById from './components/AddProductById';
import ViewProduct from './components/ViewProduct';
import EditProduct from './components/EditProduct';
import EditCustomer from './components/EditCustomer';
import AddCustomer from './components/AddCustomer';
import CustomerList from './components/CustomerList';

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Routes>
          <Route  path="/" element={<CustomerList/>}></Route>
          <Route path="/addCustomer" element={<AddCustomer />} />
          <Route path="/customerList" element={<CustomerList />} />
          <Route  path="/viewProduct/:id" element={<ViewProduct/>}></Route>
          <Route  path="/editCustomer/:id" element={<EditCustomer/>}></Route>
          <Route  path="/editProduct/:id/products/:id" element={<EditProduct/>}></Route>
          <Route  path="/addProductById/:id/products" element={<AddProductById/>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
