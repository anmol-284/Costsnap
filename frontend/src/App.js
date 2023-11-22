import './App.css';
import Navbar from './components/common/Navbar';
import Home from './pages/Home'
import {Routes,Route} from "react-router-dom"
import Transactions from './pages/Transactions'
import SplitBills from './pages/SplitBills';
import Investments from './pages/Investments';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './login/Dashboard';

function App() {
  return (
    <div className='w-screen min-h-screen bg-customColor flex flex-col font-inte '>
       
       <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route
             path ="dashboard"
             element={<Dashboard/>}
          />
          <Route
             path ="transactions"
             element={<Transactions/>}
          />

           <Route
             path ="splitbills"
             element={<SplitBills/>}
          />

           <Route
             path ="investments"
             element={<Investments/>}
          />

           <Route
             path ="settings"
             element={<Settings/>}
          />
          <Route 
            path = "login"
            element={<Login/>}
          />
          <Route 
            path = "signup"
            element={<Signup/>}
          />
        </Routes>
    </div>
  );
}

export default App;
