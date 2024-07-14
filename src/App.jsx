import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { EmployeeData } from './EmployeeData';

export default function App() {
  const [data, setData] = useState([]);
  const[firstName,setFirstName]=useState('')
  const[lastName,setLastName]=useState('')
  const[age,setAge]=useState(0)
  const[id,setId]=useState(0)
  const[isUpdate,setIsUpdate]=useState(false)

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit=(id)=>{
    const dt=data.filter((item)=>item.id ===id)
    
    if(dt!==undefined){
      setIsUpdate(true)
      setId(id)
      setFirstName(dt[0].firstName)
      setLastName(dt[0].lastName)
      setAge(dt[0].age)
    }
  }
  
  const handleDelete=(id)=>{
    if(id>0){
      if(window.confirm("Are you sure to Delete this Type")){
        const dt=data.filter((item)=>item.id!==id)
        setData(dt)
      }
      
    }
 }

 const handleSave=(e)=>{
  let error=''
  if(firstName=='')
    error+="First Name is Required, ";
  if(lastName=='')
    error+="Last Name is required, "
if(age<=0){
  error+="Age is required"
}
if(error===''){
  e.preventDefault()
  const dt=[...data]
  const newObject={
      id:EmployeeData.length+1,
      firstName:firstName,
      lastName:lastName,
      age:age
  }
  dt.push(newObject)
  setData(dt)
}
else{
  alert(error)
}
  
 }

 const handleUpdate=()=>{
  const index=data.map((item)=>{
    return item.id
  }).indexOf(id)

  const dt=[...data]
  dt[index].firstName=firstName
  dt[index].lastName=lastName
  dt[index].age=age
  setData(dt)
  handleClear()
 }

 const handleClear=()=>{
  setId(0)
  setFirstName('')
  setLastName('')
  setAge('')
  setIsUpdate(false)
 }

  return (
    
    <div className="app" style={{marginTop:'10px',marginBottom:'10px'}}>
      <div style={{display:'flex',justifyContent:'center', boxSizing:'border-box', gap:'2px'}}>
       
          <div>
          <label>First Name:
            <input type="text" placeholder='Enter First Name' onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
          </label>&nbsp;
          </div>
          <div>
          <label>Last Name:
            <input type="text" placeholder='Enter Last Name' onChange={(e)=>setLastName(e.target.value)} value={lastName}/>&nbsp;
          </label>
          </div>
          <div>
          <label>Age:
            <input type="text" placeholder='Enter Your Age' onChange={(e)=>setAge(e.target.value)} value={age} />&nbsp;
          </label>
          </div>
          <div>
            {
              !isUpdate ?<button className='btn btn-success ' style={{gap:3}} onClick={(e)=>handleSave(e)}>Save</button>
              :<button style={{paddingRight:'4px'}} className='btn btn-success' onClick={()=>handleUpdate()}>Update</button>
            }
          
          <button className='btn btn-danger' onClick={()=>handleClear()}>Clear</button>
          </div>

        

      </div>
      <Table className='table table-hover'>
        <thead>
          <tr>
            <td>Sr. No</td>
            <td>ID</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <button className='btn btn-success' onClick={()=>handleEdit(item.id)}>Edit</button>&nbsp;
              <button className='btn btn-danger' onClick={()=>handleDelete(item.id)}>Delete</button>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
