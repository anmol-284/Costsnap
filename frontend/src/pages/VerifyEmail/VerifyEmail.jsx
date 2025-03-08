import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const vtoken = searchParams.get('vtoken');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/verifyemail/${vtoken}`);

        const data = await response.json();

        if (response.ok) {
          setMessage('Email successfully verified!');
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setMessage(data.message || 'Verification failed.');
        }
      } catch (error) {
        setMessage('Error occurred during email verification.');
      }
      setLoading(false);
    };

    if (vtoken) {
      verifyEmail();
    } else {
      setMessage('Invalid verification link.');
      setLoading(false);
    }
  }, [vtoken, navigate]);

  return (
    <div>
      {loading ? <p>Loading...</p> : <p>{message}</p>}
    </div>
  );
};

export default VerifyEmail;
