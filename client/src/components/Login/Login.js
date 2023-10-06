
import './Login.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const initialValues = {emailError:"",passwordError:""}
    const [formErrors,setFormErrors] = useState(initialValues);
    const navigate = useNavigate();
    const redirectToHomePage = () => {
      navigate("/home");
    }
    const login = async (e)=>{
      e.preventDefault();
      const errors = validate(email,password);
      const {e1,e2} = errors;
      setFormErrors({...formErrors,emailError:e1,passwordError:e2});
      console.log("Hai0");
      
      if(!e1 && !e2){
        const username = await fetchLoginApi(email,password);
        props.onLogin({username,email});
        redirectToHomePage();
      }
    }
    const fetchLoginApi = async (email,password)=>{
      const url = "http://localhost:3001/login";
      const options = {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "accept":"application/json"
        },
        body:JSON.stringify({email:email,password:password})
      }
      const response = await fetch(url,options);
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData.user.username;
      
    }
    const validate = (email,password)=>{
      const errors = {};
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if(!email){
        errors.e1 = "email is required";
      }
      else if(!regex.test(email)){
        errors.e1 = "email is invalid";
      }
      if(!password){
        errors.e2 = "password is required";
      }
      return errors;
    }

    const redirectToSignUpPage = (e)=>{
      e.preventDefault();
      navigate('/signup');
      console.log("redirected to sign up page");
    }
    return (
      <div className="loginPage">
        <div className = "login-container">
          <h1>Authenticate</h1>
          <form type="submit">
              <div className='input-container'>
              <label htmlFor="nameInput" >Email</label>
                <input type = "text" id = "nameInput" className='name-input' placeholder='email...' onChange={(event)=>{
                  setUsername(event.target.value);
                }}  />
                <p>{formErrors.emailError}</p>
              </div>
              <div className='input-container'>
              <label htmlFor="passwordInput" >Password</label>
                <input type = "password" id = "passwordInput" className='password-input' placeholder='password...' onChange={(event)=>{
                  setPassword(event.target.value);
                }} />
                <p>{formErrors.passwordError}</p>
              </div>
              <div className='buttons'>
                <button className="button" type="submit" onClick={login}>Login</button>
                <p className='or'>Or</p>
                <button className='button' type ="button" onClick={redirectToSignUpPage}>Sign Up</button>
              </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default Login;
  