import React, {useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

const AddMembers = () => {

    const navigate = useNavigate();

    const [member, setMember] = useState({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        department: ""
    });

    const [errorMessage, setErrorMessage] = useState({
        errorId: "",
        errorFirstName: "",
        errorLastName: "",
        errorEmail: "",
        errorDepartment: ""
    });


    const handleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        setMember({...member,[name]: value});

        console.log(member);

        Validation(name, value);
    }

    const Validation = (name, value) => {
        let error = errorMessage;

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
        setErrorMessage(error);
    };

    const handleSubmit = (event) => {
        if(member.id !== "" && member.firstname !== "" && member.lastname !== "" && member.email !== "" && member.department !== ""){
            axios.post("http://localhost:4000/users", member)
            .then((res)=>{alert("Member Submitted"); navigate("/"); })
            .catch((res)=> alert("Submission Failed"))
        }
        else
        {
            alert("Provide Data in all fields");
        }
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
    <div className="row">
        <div className="col">
            <h1>Add Member</h1>
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
                {errorMessage.errorId ? <p>{errorMessage.errorId}</p> :  null}
                <label>Enter Member First Name</label>
                <input
                    type="text"
                    placeholder="Enter First Name"
                    name="firstname"
                    value={member.firstname}
                    onChange={handleChange}
                />
                <br />
                {errorMessage.errorFirstName ? <p>{errorMessage.errorFirstName}</p> :  null}
                <label>Enter Member Last Name</label>
                <input
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastname"
                    value={member.lastname}
                    onChange={handleChange}
                />
                <br />
                {errorMessage.errorLastName ? <p>{errorMessage.errorLastName}</p> :  null}
                <label>Enter Member Email</label>
                <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    value={member.email}
                    onChange={handleChange}
                />
                <br />
                {errorMessage.errorEmail ? <p>{errorMessage.errorEmail}</p> :  null}
                <label>Enter Member Department</label>
                <input
                    type="text"
                    placeholder="Enter Department"
                    name="department"
                    value={member.department}
                    onChange={handleChange}
                />
                <br />
                {errorMessage.errorDepartment? <p>{errorMessage.errorDepartment}</p> :  null}
                <button type="submit">Add Member</button>
            </Form>
        </div>
    </div>
  )
}

export default AddMembers;
