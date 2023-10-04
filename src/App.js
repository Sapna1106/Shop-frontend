import './App.css';
import Sidebar from './components/Sidebar';
import EditCustomer from './components/EditCustomer';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddProductById from './components/AddProductById';
import Display from './components/Display';
import ViewProduct from './components/ViewProduct';

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar></Sidebar>
        <Routes>
          <Route  path="/" element={<Display/>}></Route>
          <Route  path="/viewProduct/:id" element={<ViewProduct/>}></Route>
          <Route  path="/editCustomer/:id" element={<EditCustomer/>}></Route>
          <Route  path="/addProductById/:id/products" element={<AddProductById/>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
