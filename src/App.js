import logo from './logo.svg';
import './App.css';
import  {BrowserRouter, Routes , Route, useLocation} from 'react-router'

import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Navbar from './Components/Navbar/Navbar';
import Layout from './Components/Layout/Layout';
import DataContext, { DataProvider } from './DataContext';
import PatientDetails from './Components/PatientDetails/PatientDetails';

function App() {

  const location=useLocation()
  const showNavbar=location.pathname!=='/'

  return (
    <div >
    
      {showNavbar && <Navbar/>}
      <Routes>
      
        <Route path='/' element={<Login/>} />
       
        <Route path='/data' element={<Layout/>}>     
          <Route path=":phone_number" element={<PatientDetails/>}/>
        </Route>

      </Routes>
      


    </div>
  );
}

export default App;
