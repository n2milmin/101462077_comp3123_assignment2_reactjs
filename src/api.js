import axios from 'axios';

const API = axios.create({ 
    baseURL: 'http://localhost:3000/api/v1',
    headers: { 'Content-Type': 'application/json' },
})


API.interceptors.request.use(temp => {
    const accessToken = localStorage.getItem('accessToken')
    if(accessToken) 
        temp.headers.Authorization = `Bearer ${accessToken}`
    return temp
})

/******************************** Employees ********************************/
// GET emp
export const getEmployees = async () => API.get('/emp/employees')

// GET emp by id 
export const getEmployeeById = id => API.get(`/emp/employees/${id}`)

// POST add emp 
export const addEmployee = data => API.post('/emp/employees', data)

// POST update emp
export const updateEmployee = async (id, data) => API.put(`/emp/employees/${id}`, data)

// DELETE emp
export const deleteEmployee = id => API.delete(`/emp/employees/${id}`)



/******************************** Users ********************************/
// POST login
export const login = data => API.post('/user/login', data)

// POST signup 
export const signup = async data => API.post('/user/signup', data)


/******************************** Search ********************************/
// department 
export const departmet = async type => API.get(`/emp/search/department/${type}`)

// position 
export const position = async type => API.get(`/emp/search/position/${type}`)