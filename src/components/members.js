import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Members = () => {

    const [member, setMember] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:4000/users")
        .then((res)=>{
            setMember(res.data);
            console.log("API Accessed");
        })
        .catch((err)=>alert("404: API not responding"))
    },[]);

    const handleDelete = (id) => {
        navigate('/deletemember/' + id);
    }

    const handleEdit = (id) => {
        navigate('/editmember/' + id);
    }

  return (
    <div>
      <h1>Member List</h1>
      <table>
        <thead>
            <tr>
                <td style={{backgroundColor: "orange", padding: "10px", fontSize: "20px"}}>ID</td>
                <td style={{backgroundColor: "orange", padding: "10px", fontSize: "20px"}}>First Name</td>
                <td style={{backgroundColor: "orange", padding: "10px", fontSize: "20px"}}>Last Name</td>
                <td style={{backgroundColor: "orange", padding: "10px", fontSize: "20px"}}>Email</td>
                <td style={{backgroundColor: "orange", padding: "10px", fontSize: "20px"}}>Department</td>
                <td style={{backgroundColor: "orange", padding: "10px", fontSize: "20px"}}>Edit</td>
                <td style={{backgroundColor: "orange", padding: "10px", fontSize: "20px"}}>Delete</td>
            </tr>
        </thead>
        <tbody>
            {member.map((member)=>{
                return(
                    <tr key={member.id}>
                        <td style={{padding: "10px", border: "solid"}}>{member.id}</td>
                        <td style={{padding: "10px", border: "solid"}}>{member.firstname}</td>
                        <td style={{padding: "10px", border: "solid"}}>{member.lastname}</td>
                        <td style={{padding: "10px", border: "solid"}}>{member.email}</td>
                        <td style={{padding: "10px", border: "solid"}}>{member.department}</td>
                        <td>
                            <button style={{padding: "10px", border: "solid", cursor: "pointer"}} onClick={()=>handleEdit(member.id)}>Edit</button>
                        </td>
                        <td>
                            <button style={{padding: "10px", border: "solid", cursor: "pointer"}} onClick={()=>handleDelete(member.id)}>Delete</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Members;
