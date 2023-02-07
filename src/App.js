import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Members from './components/members';
import AddMembers from './components/addmembers';
import EditMember from './components/editmember';
import DeleteMember from './components/deletemember';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Members />} />
          <Route path="/addmembers" element={<AddMembers />} />
          <Route path="/editmember/:id" element={<EditMember />} />
          <Route path="/deletemember/:id" element={<DeleteMember />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
