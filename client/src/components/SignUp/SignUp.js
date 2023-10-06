import './SignUp.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PopUp from '../PopUp/PopUp';

function SignUp(){
    const initialValues1 = {username:"",email:"",password:""}
    const [formDetails,setFormDetails] = useState(initialValues1);
    const initialValues2 = {usernameError:"",emailError:"",passwordError:""}
    const [formErrors,setFormErrors] = useState(initialValues2);
    const navigate = useNavigate();
    let isOpen = false;
    const handleChange = (e)=>{
        const { name, value} = e.target;
        setFormDetails({...formDetails,[name]:value});
    }
    const signup = (e)=>{
        e.preventDefault();
        const errors = validate(formDetails);
        const {e1,e2,e3} = errors;
        setFormErrors({...formErrors,usernameError:e1,passwordError:e2,emailError:e3});
        if(e1 ==="" && e2 ==="" && e3 === ""){
            console.log("hai");
            fetchSignUpApi(formDetails);
            redirectToLoginPage();
        }
    }
    const redirectToLoginPage = ()=>{
        navigate("/");
    }

    const fetchSignUpApi = async (formDetails)=>{
        
        const url = "http://localhost:3001/signup";
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "accept":"application/json"
            },
            body:JSON.stringify({
                formDetails:formDetails
            })
        };
        const response = await fetch(url,options);
        const jsonData = await response.json();
        console.log(jsonData);
        
    }
    const validate = (formDetails)=>{
        const errors = {e1:"",e2:"",e3:""};
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const {username,email,password} = formDetails;

        if(!username){
            errors.e1 = "username is required";
        }
        if(!password){
            errors.e2 = "password is required";
        }
        if(!email){
            errors.e3 = "email is required";
        }else if(!regex.test(email)){
            errors.e3 = "email is invalid";
        }
        return errors;
    }
    
    return (
        <div className="signUpPage">
          <div className = "signup-container">
            {isOpen && <PopUp />}
            <h1>Authenticate</h1>
            <form type="submit">
                <div className='input-container'>
                <label htmlFor="nameInput" >Username</label>
                  <input type = "text" id = "nameInput" className='name-input' placeholder='username...' name ="username" value={formDetails.username} onChange={handleChange}  />
                  <p>{formErrors.usernameError}</p>
                </div>
                <div className='input-container'>
                <label htmlFor="emailInput" >Email</label>
                  <input type = "text" id = "emailInput" className='email-input' placeholder='email...' name="email" value = {formDetails.email} onChange={handleChange}  />
                  <p>{formErrors.emailError}</p>
                </div>
                <div className='input-container'>
                <label htmlFor="passwordInput" >Password</label>
                  <input type = "password" id = "passwordInput" className='password-input' placeholder='password...' name="password" value = {formDetails.password} onChange={handleChange} />
                  <p>{formErrors.passwordError}</p>
                </div>
                <div className='buttons'>
                  <button className='button' type="submit" onClick={signup}>Sign Up</button>
                </div>
            </form>
          </div>
        </div>
      );
    }
    
    export default SignUp;

