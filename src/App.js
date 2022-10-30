import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes, Navigate } from 'react-router-dom';

import Home from "./pages/home/home.component";
import Login from "./pages/login/login.component";

function App() {
  
  const user = localStorage.getItem("token");

	return (
		<div>
      <Routes>
        { user && <Route path="/" exact element={<Home />} /> }
        <Route path="/" element={<Navigate replace to="/account/login" />} />
        <Route path="/account/login" exact element={<Login />} />
		  </Routes>
    </div>
	);
}

export default App;
