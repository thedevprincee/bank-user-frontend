

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import loginBackground from "assets/images/curved-images/curved-6.jpg";
import api from '../../../api/index.js'
import { ToastContainer, toast } from 'react-toastify';


function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies()
  const navigate = useNavigate()

  
  const emailHander = (email)=>{
    setEmail(email)
  }
  const passHander = (pass)=>{
    setPassword(pass)
  }

  useEffect(()=>{
    if(localEmail){
      emailHander(localEmail) 
    } 
    if(localPassword){
      passHander(localPassword)
    } 
  
  },[])


  

  const loginUser = async (e)=>{
    try {
      if(!password && !email ){
        toast.error("Please enter your Email and Password!",{ theme: "colored"});
      }else
      if(!password && email){
        toast.error("Please enter your Password!",{ theme: "colored"});
      }else if(!email && password){
        toast.error("Please enter youe Email!",{ theme: "colored"});
      } else{
        if(rememberMe){
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
        }else{
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
        let formData = {email, password}
        formData = new URLSearchParams(formData)
        const response = await api.post('/login', formData)
        const sterilizeUser = JSON.stringify(response.data.user)

        const decode = jwtDecode(response.data.token)
        cookies.set("jwt", response.data.token, {
          expires: new Date(decode.exp * 1000)
        })
        console.log(decode);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userdate', sterilizeUser);


        toast.success("Login Successful",{ theme: "colored"});
        setTimeout(()=>{
          navigate("/dashboard")
        },6000)      
      }
    } catch (err) {
      if(err){
        toast.error(err.response?.data, { theme: "colored"});
        // console.log(err.response.status);
        // console.log(err.response.header);
      }
    }
    
  }

  const localEmail = localStorage.getItem('email');
  const localPassword = localStorage.getItem('password');


  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={loginBackground}
    >
    <ToastContainer />

      <SoftBox component="form" role="form">
      <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput value={email} onChange={(e)=>{setEmail(e.target.value)}}  type="email" placeholder="Email" />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton onClick={()=>{loginUser()}} variant="gradient" color="info" fullWidth>
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
