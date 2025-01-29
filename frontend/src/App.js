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
import ProtectedRoute from './components/common/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = getCookie('token');
    setToken(savedToken);
  }, []);

  return (
    <div className='w-screen min-h-screen bg-gray-950 flex flex-col'>
      {token && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="transactions" element={<ProtectedRoute> <Transactions /> </ProtectedRoute>} />
        <Route path="splitbills" element={<ProtectedRoute> <SplitBills /> </ProtectedRoute>} />
        <Route path="investments" element={<ProtectedRoute> <Investments /> </ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute> <Settings /> </ProtectedRoute>} />
        <Route path="login" element={<Login onLogin={(newToken) => setToken(newToken)} />} />
        <Route path="signup" element={<Signup />} />
        <Route path="about" element={<ProtectedRoute> <About /> </ProtectedRoute>} />
        <Route path="exportdata" element={<ProtectedRoute> <ExportData /> </ProtectedRoute>} />
        <Route path="help" element={<ProtectedRoute> <Help /> </ProtectedRoute>} />
        <Route path="notifications" element={<ProtectedRoute> <Notifications /> </ProtectedRoute>} />
        <Route path="theme" element={<Theme />} />
        <Route path="addtransaction" element={<ProtectedRoute> <AddTransaction /> </ProtectedRoute>} />
        <Route path="viewtransaction" element={<ProtectedRoute> <ViewTransaction /> </ProtectedRoute>} />
        <Route path="forgetpassword" element={<ForgetPassword />} />
        <Route path="confirmpassword" element={<ConfirmPassword />} />
        <Route path="group-view" element={<ProtectedRoute> <GroupView /> </ProtectedRoute>} />
        <Route path="chart" element={<ProtectedRoute> <Chartpage /> </ProtectedRoute>} />
        <Route path="verifyemail" element={<EmailVerificationPage />} />
      </Routes>
    </div>
  );
}

export default App;
