import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteMember = () => {

    const [member, setMember] = useState({});
    const [errorData, setErrorData] = useState();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:4000/users/" + params.id)
        .then((res)=>{
            setMember(res.data);
        })
        .catch((res)=>setErrorData("Member not found"))
    }, [params.id]);

    const deleteMember = (event) => {
        axios.delete("http://localhost:4000/users/" + params.id)
        .then((res)=>{setMember(res.data); navigate("/"); })
        .catch((res)=>alert("Submission Error"));
    };

  return (
    <div>
      <h1>Delete Member</h1>
      { member.id ? (
        <div>
            <h4>Member Id: {member.id}</h4>
            <h4>Member First Name: {member.firstname}</h4>
            <h4>Member Last Name: {member.lastname}</h4>
            <h4>Member Email: {member.email}</h4>
            <h4>Member Department: {member.department}</h4>
        </div>
      ) : (
        <div>{errorData}</div>
      )}
      <button onClick={deleteMember}>Delete</button>
    </div>
  )
}

export default DeleteMember;