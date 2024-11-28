import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api/v1'})


/******************************** Employees ********************************/
// GET emp
export const getEmployees = () => API.get('/emp/employees')

// GET emp by id 
export const getEmployeeById = id => API.get(`/emp/employees/${id}`)

// POST add emp 
export const addEmployee = data => API.post('/emp/employees', data)

// POST update emp
export const updateEmployee = (id, data) => API.post(`/emp/employees/${id}`)

// DELETE emp
export const deleteEmployee = id => API.delete(`/emp/employees/${id}`)



/******************************** Users ********************************/
// POST login
export const login = data => API.post('/user/login')

// POST signup 
export const signup = data => API.post('/user/signup')