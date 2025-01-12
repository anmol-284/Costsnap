import './App.css';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Transactions from './pages/Transactions';
import SplitBills from './pages/SplitBills';
import Investments from './pages/Investments';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './SettingPages/About';
import ExportData from './SettingPages/ExportData';
import Help from './SettingPages/Help';
import Notifications from './SettingPages/Notifications';
import Theme from './SettingPages/Theme';
import AddTransaction from './InvestPages/AddTransaction';
import ViewTransaction from './InvestPages/ViewTransaction';
import ForgetPassword from './login/ForgetPassword';
import ConfirmPassword from './login/ConfirmPassword';
import GroupView from './SplitPages/GroupView';
import Chartpage from './pages/PieChart';
import EmailVerificationPage from './pages/VerifyEmail';
import { getCookie } from '../src/components/utils';
import Dashboard from './login/Dashboard';
import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = getCookie('token');
    setToken(savedToken);
  }, []);

  return (
    <div className='w-screen min-h-screen bg-customColor flex flex-col font-inte'>
      {token && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="splitbills" element={<SplitBills />} />
        <Route path="investments" element={<Investments />} />
        <Route path="settings" element={<Settings />} />
        <Route path="login" element={<Login onLogin={(newToken) => setToken(newToken)} />} />
        <Route path="signup" element={<Signup />} />
        <Route path="about" element={<About />} />
        <Route path="exportdata" element={<ExportData />} />
        <Route path="help" element={<Help />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="theme" element={<Theme />} />
        <Route path="addtransaction" element={<AddTransaction />} />
        <Route path="viewtransaction" element={<ViewTransaction />} />
        <Route path="forgetpassword" element={<ForgetPassword />} />
        <Route path="confirmpassword" element={<ConfirmPassword />} />
        <Route path="group-view" element={<GroupView />} />
        <Route path="chart" element={<Chartpage />} />
        <Route path="verifyemail" element={<EmailVerificationPage />} />
      </Routes>
    </div>
  );
}

export default App;
