import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Blogs from './components/Blogs';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/blogs" element={<BlogList />} /> */}
          <Route path="/blogs" element={<ProtectedRoute element={Blogs} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
