import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import validator from 'validator';

const EditMember = () => {

  const params = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [member, setMember] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    department: ""
  });

  const [errorData, setErrorData] = useState({
    errorId: "",
    errorFirstName: "",
    errorLastName: "",
    errorEmail: "",
    errorDepartment: ""
  });

  useEffect(()=>{
    axios.get(`http://localhost:4000/users/${params.id}`)
    .then((res)=>{
      setMember(res.data);
    })
    .catch((res)=>setErrorMessage("Member not found"))
  }, [params.id])

  const handleChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    setMember({...member,[name]: value})

    Validation(name, value);

  }

  const Validation = (name, value) => {
    let error = errorData;

    switch(name){
        case "id":
            if(value < 1000){
                error.errorId = "Value must be above 1000";
            }
            else
            {
                error.errorId = null;
            }
            break;
        case "firstname":
            if(value.length >= 2){
                error.errorFirstName = null;
            }    
            else
            {
                error.errorFirstName = "Must be 2 value or longer";
            }
            break;
        case "lastname":
            if(value.length >= 2){
                error.errorLastName = null;
            }    
            else
            {
                error.errorLastName = "Must be 2 value or longer";
            }
            break;
        case "email":
            if(validator.isEmail(value)){
                error.errorEmail = "Valid Email"
            }    
            else
            {
                error.errorEmail = "Please Enter Valid Email";
            }
            break;
        case "department":
            if(value.length >= 2){
                error.errorDepartment = null;
            }    
            else
            {
                error.errorDepartment = "Must be 2 value or longer";
            }
            break;
        default:
            break;
    }
    setErrorData(error);
};


  const handleSubmit = (event) => {
    axios.put(`http://localhost:4000/users/${params.id}`, member)
    .then((res)=>{alert("Member edit submitted"); navigate("/"); })
    .catch((err)=>{alert("Edit member submission error"); })

    setMember({
      id: "",
    firstname: "",
    lastname: "",
    email: "",
    department: ""
    })
    event.preventDefault();
  }

  return (
    <div>
      <h1>Edit Member</h1>
      {member.id ? (
        <div>
          <h4>Member Id: {member.id}</h4>
          <h4>Member First Name: {member.firstname}</h4>
          <h4>Member Last Name: {member.lastname}</h4>
          <h4>Member Email: {member.email}</h4>
          <h4>Member Department: {member.department}</h4>
        </div>
      ) : (
        <div>{errorMessage}</div>
      )}
      <h1>Edit Member</h1>
      <Form onSubmit={handleSubmit}>
        <label>Enter Member Id</label>
        <input 
          type="number"
          placeholder="Enter Id"
          name="id"
          value={member.id}
          onChange={handleChange}
        />
        <br />
        {errorData.errorId ? <p>{errorData.errorId}</p> :  null}
        <label>Enter Member First Name</label>
        <input 
          type="text"
          placeholder="Enter First Name"
          name="firstname"
          value={member.firstname}
          onChange={handleChange}
        />
        <br />
        {errorData.errorFirstName ? <p>{errorData.errorFirstName}</p> :  null}
        <label>Enter Member Last Name</label>
        <input 
          type="text"
          placeholder="Enter Last Name"
          name="lastname"
          value={member.lastname}
          onChange={handleChange}
        />
        <br />
        {errorData.errorLastName ? <p>{errorData.errorLastName}</p> :  null}
        <label>Enter Member Email</label>
        <input 
          type="text"
          placeholder="Enter Email"
          name="email"
          value={member.email}
          onChange={handleChange}
        />
        <br />
        {errorData.errorEmail ? <p>{errorData.errorEmail}</p> :  null}
        <label>Enter Member Department</label>
        <input 
          type="text"
          placeholder="Enter Department"
          name="department"
          value={member.department}
          onChange={handleChange}
        />
        <br />
        {errorData.errorDepartment ? <p>{errorData.errorDepartment}</p> :  null}
        <button type="submit">Submit Edit</button>
      </Form>
    </div>
  )
}

export default EditMember;
