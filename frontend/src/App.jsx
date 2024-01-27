import React from 'react';
import { BrowserRouter,Routes,Route, useNavigate } from 'react-router-dom';
import { Signup } from './components/signup';
import { Signin } from './components/signin';
function App() {

  return (
    <div>
      <BrowserRouter>
      <div>
        <button onClick={()=>{
          window.location.href="/signup"
        }}>sign Up page</button>
        <button onClick={()=>{
          window.location.href="/signin"
        }}>sign in page</button>
      </div>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
      </BrowserRouter>
    </div>)
  
}

export default App;
