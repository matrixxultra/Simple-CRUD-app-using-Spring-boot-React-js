import React, { useEffect, useState } from 'react'

const Index = () => {
    const [data,setData] = useState([])
    const [user,setUser] = useState({})
    const [ModalType,setModalType] = useState('')
    const [formData,setFormData] = useState({})
    
    useEffect(()=>{
        fetch("http://localhost:5000/users/lister").then(res=>res.json()).then(r=>setData(r))
        console.log(data)
    },[])

   
   const handleChange = (e)=>{
    setFormData({...formData,[e.target.name] : e.target.value})
   }

   const handleSubmit = async(e)=>{
    if(ModalType == 'add'){
        try {
        
            const response = await fetch("http://localhost:5000/users/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
      
            const result = await response.json();
            console.log("Added message:", result);
            
           
          } catch (error) {
            console.error("Error adding message:", error);
          }
          
    }
    else {
        try {
          
            const response = await fetch("http://localhost:5000/users/edit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({"id" : user.id, ...formData}),
            });
      
            const result = await response.json();
            console.log("Added message:", result);
            
           
          } catch (error) {
            console.error("Error adding message:", error);
          }
    }
   

   }



   const handleDelete = async(id)=>{
    try {
        const response = await fetch(`http://localhost:5000/users/delete/${id}`, {
          method: "DELETE",
        });
  
        const result = await response.json();
        console.log("Deleted message:", result);
        
        
      } catch (error) {
        console.error("Error deleting message:", error);
      }
   }
const handleEdit = (u)=>{
    setModalType("edit")
    setUser(u)
}




  return (
    <>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal" data-bs-whatever="@fat"  onClick={()=>setModalType("add")}>Ajouter</button>
    

      <table className="table table-striped">
      <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope='col'>Action</th>
            </tr>
      </thead>
      <tbody>
        {
            data?.map(item=><tr key={item.id}>
                <td>{item.id}</td>
                 <td>{item.firstname}</td>
                 <td>{item.lastname}</td>
                 <td>
                 <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modal" value={'edit'} onClick={()=>handleEdit(item)} data-bs-whatever="@fat">EDIT</button>
                 <form>
                 <button className="btn btn-danger" onClick={()=>handleDelete(item.id)}>Delete</button>
                 </form>
                 
                 </td>
            </tr>)
        }
      </tbody>
      </table>

    

      <div className="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" >
  <div className="modal-dialog">
    <div className="modal-content">
    <form onSubmit={handleSubmit}>
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">{ModalType == "add" ? 'Ajouter User':'Edit User ' + user.firstname +' '+ user.lastname}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div className="modal-body">

      
          <div className="mb-3">
            <label for="message-text" className="col-form-label">FirstName:</label>
            <input type="text" className="form-control" name='firstname'   onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">LastName:</label>
            <input type="text" className="form-control" name='lastname'  onChange={handleChange}  />
          </div>
      
         
         
     
      <div className="modal-footer">
      
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type='submit'  className="btn btn-primary">{ModalType == "add" ? 'Ajouter User':'Edit User'}</button>
      </div>
      </div>
      </form>
    </div>
  </div>
</div> 

    </>
    )
}

export default Index
