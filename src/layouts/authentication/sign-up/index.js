
import { useEffect, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";


// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import api from '../../../api/index.js'
function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const handleSetAgremment = () => setAgremment(!agreement);

  const navigate = useNavigate()

  

  const createNewUser = async (e)=>{
    try {
      if(password != password2){
        toast.error("Password does not match!",{ theme: "colored"});
      } else{
        let formData = {name, email, username, password, phone}
        formData = new URLSearchParams(formData)
        const response = await api.post('/create-user/', formData)
        // console.log(response);
        toast.success("Registraton Successful",{ theme: "colored"});
        setTimeout(()=>{
          navigate("/sign-in")
        },6000)
      }
    } catch (err) {
      toast.error(err.response.data,{ theme: "colored"});
      console.log(err.response.status);
      console.log(err.response.header);
    }
    
  }


  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
    <ToastContainer />

      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput onChange={(e)=>{setName(e.target.value)}} placeholder="Name" />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email" />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput onChange={(e)=>{setUsername(e.target.value)}} placeholder="Username" />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput onChange={(e)=>{setPhone(e.target.value)}} placeholder="Phone" />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput onChange={(e)=>{setPassword2(e.target.value)}} type="password" placeholder="Retype Password" />
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton onClick={()=>{createNewUser()}} variant="gradient" color="dark" fullWidth>
                sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
