import { Label, TextInput, Textarea} from "flowbite-react";
import { useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Form = ({getTodos, formdata, setFormdata}) => {
  let getValue = (e) => {
    let {name, value, type, checked} =e.target;
    let olddata = { ...formdata };

    if (type === 'checkbox') {
      olddata[name] = checked;
    }  
    else {
      olddata[name] = value;
    }
    setFormdata(olddata);
  }

  let saveInfo = async (e) => {
    e.preventDefault();
    if(formdata._id) {
      await axios.put(`${import.meta.env.VITE_Backend_BaseUrl}/todo/api/update/${formdata._id}/`, formdata)
      toast.success("Enquiry Updated Successfully", );
      setFormdata({
        title: '',
        description: '',
        date: '',
        assignedTo: '',
        completed: false,
        _id: ''
        })
      }
    else{
          await axios.post(`${import.meta.env.VITE_Backend_BaseUrl}/todo/api/insert/`, formdata)
          .then((response) => {
            toast.success("Enquiry Saved Successfully", );
            setFormdata({
              title: '',
              description: '',
              date: '',
              assignedTo: '',
              completed: false
            });
          });
        }
    getTodos();
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h1 className='mb-2 text-5xl text-blue-500 bg-gradient-to-br rounded-3xl from-rose-800 to-amber-600 text-center'>Create a Todo</h1>
      <form action="" onSubmit={saveInfo}>
        <Label className="mb-2 block" htmlFor="title">Title: </Label>
          <TextInput name="title" value={formdata.title} onChange={getValue} className="mb-2 block" type="text" placeholder='Enter Task' sizing="lg" />
        <Label className="mb-2 block" htmlFor="description">Your message</Label>
          <Textarea name="description" value={formdata.description} onChange={getValue} className="mb-4" placeholder="Leave a comment..." required rows={4} />
          <Label className="mb-2 block" htmlFor="assignedTo">Assigned To: </Label>
            <TextInput name="assignedTo" value={formdata.assignedTo} onChange={getValue} className="mb-2 block" type="text" placeholder='Enter Name' sizing="lg" />
        <label className="mb-2 block" htmlFor="date">Due Date:</label>
          <input name="date" value={formdata.date} onChange={getValue}  className="mb-4 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" type="date"/>
        
        <div className="flex justify-center mb-4">
            <input name="completed" checked={formdata.completed} onChange={getValue} type="checkbox" className="mr-2 accent-green-600"/>
          <label htmlFor="completed" className="text-gray-700">Completed</label>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{formdata._id? "Update" : "Submit"}</button>
        </div>
        
      </form>
    </div>
        
  )
}

export default Form