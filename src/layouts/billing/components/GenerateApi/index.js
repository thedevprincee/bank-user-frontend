
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React base styles
import borders from "assets/theme/base/borders";

// Images

import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

import api from '../../../../api/index'
import { useNavigate } from "react-router-dom";

function GenerateApi() {
  const isApiGenerated = useSelector((state) => state.apikey.generated)
  const api_key = useSelector((state) => state.apikey.api_key)
  const secret_key = useSelector((state) => state.apikey.secret_key)

  
  const getApiKeys = async ()=>{
    try {
      const userID = JSON.parse(localStorage.getItem('userdate')).id
      let formData = {id: userID}
        formData = new URLSearchParams(formData)
        console.log(formData);
      const response = await api.post(`/api-key`, formData)
      console.log(response);
      const navigate = useNavigate()
      toast.success("API Key generated successfuly")
      setTimeout(()=>{
        navigate('/dashboard')
      },3000)

    } catch (error) {
      console.log(error.response.data);
    }
}

  const { borderWidth, borderColor } = borders;

  return (
    <Card id="delete-account">
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography variant="h6" fontWeight="medium">
          API Keys
        </SoftTypography>
        {
          !isApiGenerated ? (
            <SoftButton variant="gradient" color="dark"  onClick={()=>{getApiKeys()}}>
             
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;Generate API Key
            </SoftButton>
          ):
          (" ")
        
        }
        
      </SoftBox>

      {
        isApiGenerated || 
        <SoftBox pt={10} pb={10} px={2} display="flex" justifyContent="center" alignItems="center">
          <SoftTypography variant="h6" fontWeight="medium">
            No API Key Found
          </SoftTypography>
         </SoftBox>
      }

      {
        isApiGenerated &&
      
      <SoftBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <SoftBox
              border={`${borderWidth[1]} solid ${borderColor}`}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SoftBox alt="Api Key" width="10%" mr={2} />
              <SoftTypography variant="h6" fontWeight="medium">
               {api_key}
              </SoftTypography>
              <SoftBox ml="auto" lineHeight={0}>
                <Tooltip title="Copy Api Key" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    copy
                  </Icon>
                </Tooltip>
              </SoftBox>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={12}>
            <SoftBox
              border={`${borderWidth[1]} solid ${borderColor}`}
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SoftBox alt="Secret Key" width="10%" mr={2} />
              <SoftTypography variant="h6" fontWeight="medium">
                {secret_key}
              </SoftTypography>
              <SoftBox ml="auto" lineHeight={0}>
                <Tooltip title="Copy Secert Key" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    copy
                  </Icon>
                </Tooltip>
              </SoftBox>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>

    }
    </Card>
  );
}

export default GenerateApi;
