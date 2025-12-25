import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const BACKEND_URL = "https://kanakku-940001353287.us-west1.run.app";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    setLoading(true);
    const formData = new FormData();
    acceptedFiles.forEach(file => formData.append('files', file));

    try {
      const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'cumulative_expenses.csv');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <GoogleOAuthProvider clientId="940001353287-3mu3k6jd76haav5dn6tfemu46mk76dnt.apps.googleusercontent.com.apps.googleusercontent.com">
      <div style={{ padding: '50px', fontFamily: 'sans-serif', textAlign: 'center' }}>
        <h1>Kanakku Expense Tracker</h1>
        {!user ? (
          <GoogleLogin onSuccess={(res) => setUser(res)} onError={() => alert('Login Failed')} />
        ) : (
          <div {...getRootProps()} style={{ border: '2px dashed #007bff', padding: '40px', cursor: 'pointer' }}>
            <input {...getInputProps()} />
            {loading ? <p>Processing files...</p> : <p>Drop CSV/XLS files here to categorize expenses</p>}
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
