import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; 
import {AddEmployee} from "./components/AddEmployee";
import {EmployeeDetails} from "./components/EmployeeDetails";
import {Landing} from './components/Landing';
import {Login} from "./components/Login";
import {Signup} from "./components/Signup";
import {UpdateEmployee} from "./components/UpdateEmployee";
import { EmployeeList } from './components/EmployeeList';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/employeeDetails" element={<EmployeeDetails />} />
          <Route path="/updateEmployee" element={<UpdateEmployee />} /> 
          <Route path="/employeeList" element={<EmployeeList />} /> 
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
