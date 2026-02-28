import Form from './components/Form'
import Table from './components/Todotable'
import axios from 'axios'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'

function App() {
  const [todos, setTodos] = useState([]); //List of Todos
  const [formdata, setFormdata] = useState({
    title: '',
    description: '',
    date: '',
    assignedTo: '',
    completed: false
  });

  let getTodos = async () => {
    await axios.get(`${import.meta.env.VITE_Backend_BaseUrl}/todo/api/view/`).then((response) => {
      return response.data;
    }).then(finaldata =>{
      if(finaldata.status==1){
        setTodos(finaldata.data);
      }
    })
  }

  return (
    <div className='bg-gradient-to-r from-green-400 to-blue-500 h-screen'>
      <ToastContainer />
      <div className='flex flex-col items-center'>
        <div > 
          <h1 className='font-extrabold text-9xl text-green-600'>Todo List</h1>
          <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Logo" className='w-32 h-32 mx-auto' />
          <h2 className='font-extrabold text-5xl text-blue-600'>Welcome to the Todo List App</h2>
        </div>
      </div>
      <div className='grid grid-cols-[30%_auto] gap-10 mx-5'>
            <div className='bg-white h-fit w-full rounded-lg shadow-lg p-6 mt-4'>
              <Form getTodos={getTodos} formdata={formdata} setFormdata={setFormdata}/>
            </div>
            <div className='bg-white h-fit w-full rounded-lg shadow-lg p-6 mt-4'>
              <Table todos={todos} getTodos={getTodos} setFormdata={setFormdata}/>
            </div>
      </div>
    </div>
      
  )
}

export default App
