import './App.css';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Transactions from './pages/Transactions/Transactions';
import Groups from './pages/Groups/Groups';
import Investments from './pages/Investments/Investments';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ViewTransaction from './pages/Investments/ViewTransaction';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import ConfirmPassword from './pages/ForgetPassword/ConfirmPassword';
import GroupView from './pages/Groups/GroupView';
import Charts from './pages/Charts/Chart';
import EmailVerificationPage from './pages/VerifyEmail/VerifyEmail';
import ProtectedRoute from './components/common/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../src/components/utils';

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
        <Route path="groups" element={<ProtectedRoute> <Groups /> </ProtectedRoute>} />
        <Route path="investments" element={<ProtectedRoute> <Investments /> </ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute> <Settings /> </ProtectedRoute>} />
        <Route path="login" element={<Login onLogin={(newToken) => setToken(newToken)} />} />
        <Route path="signup" element={<Signup />} />
        <Route path="viewtransaction" element={<ProtectedRoute> <ViewTransaction /> </ProtectedRoute>} />
        <Route path="forgetpassword" element={<ForgetPassword />} />
        <Route path="confirmpassword" element={<ConfirmPassword />} />
        <Route path="group-view" element={<ProtectedRoute> <GroupView /> </ProtectedRoute>} />
        <Route path="chart" element={<ProtectedRoute> <Charts /> </ProtectedRoute>} />
        <Route path="verifyemail" element={<EmailVerificationPage />} />
      </Routes>
    </div>
  );
}

export default App;
