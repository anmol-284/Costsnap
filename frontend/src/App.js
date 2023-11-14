import './App.css';
import Navbar from './components/common/Navbar';
import Home from './pages/Home'
import {Routes,Route} from "react-router-dom"
import Transactions from './pages/Transactions'
import SplitBills from './pages/SplitBills';
import Investments from './pages/Investments';
import Settings from './pages/Settings';

function App() {
  return (
    <div className='w-screen min-h-screen bg-customColor flex flex-row font-inte '>
       
       <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home/>} />
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
        </Routes>
    </div>
  );
}

export default App;
