import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import axios from 'axios';

const Todotable = ({todos, getTodos, setFormdata}) => {

  let deleteRow = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
      if (result.isConfirmed) {
        await axios.delete(`${import.meta.env.VITE_Backend_BaseUrl}/todo/api/remove/${id}/`)
        toast.success("Enquiry Deleted Successfully");
        getTodos();

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    };

  let editRow = (id) => {
    axios.get(`${import.meta.env.VITE_Backend_BaseUrl}/todo/api/single/${id}/`).then((response) => {
      let respdata = response.data;
      if (respdata.status == 1) {
        setFormdata({
          title: respdata.data.title,
          description: respdata.data.description,
          assignedTo: respdata.data.assignedTo,
          date: respdata.data.date.split('T')[0],
          completed: respdata.data.completed,
          _id: respdata.data._id,
        });
      }
    });    
  }

  return (
    <div>
      <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Sr.</TableHeadCell>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Assigned To.</TableHeadCell>
            <TableHeadCell>Due Date</TableHeadCell>
            <TableHeadCell>Completed</TableHeadCell>
            <TableHeadCell>Edit</TableHeadCell>
            <TableHeadCell>Delete</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {
            todos.length>0?
            todos.map((item, index) => {
              return(
                <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{index+1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.assignedTo}</TableCell>
                  <TableCell>{item.date.split('T')[0]}</TableCell>
                  <TableCell>{item.completed ? "Yes" : "No"}</TableCell>
                  <TableCell><button onClick={()=>editRow(item._id)} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-black'>Edit</button></TableCell>
                  <TableCell><button onClick={()=>deleteRow(item._id)} className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-black'>Delete</button></TableCell>
                </TableRow>
                )
              }):
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell colSpan={7} className="text-center">No Data Found</TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
      </div>
    </div>
  )
}

export default Todotable
