import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import AddEmployee from "./components/AddEmployee";
import DeleteEmployee from "./components/DeleteEmployee";
import EmployeeDetails from "./components/EmployeeDetails";
import Landing from './components/Landing';
import Login from "./components/Login";
import Signup from "./components/Signup";
import UpdateEmployee from "./components/UpdateEmployee";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/delete/:id" element={<DeleteEmployee />} />
        <Route path="/details/:id" element={<EmployeeDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update/:id" element={<UpdateEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
