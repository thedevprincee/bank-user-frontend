
// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import GenerateApi from "layouts/billing/components/GenerateApi";
import { ToastContainer, toast } from 'react-toastify';

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import api from '../../api/index'

function Dashboard() {
  const dispatch = useDispatch()
  const isApiGenerated = useSelector((state) => state.apikey.generated)
  const userID = JSON.parse(localStorage.getItem('userdate')).id
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  const getAPI = async ()=>{
      try {
        const response = await api.get(`/user-details/${userID}`)
        if(response.data[0].api_key != ""){
          dispatch(isGenerated(true))
          dispatch(setApiKey(response.data[0].api_key ))
          dispatch(setSecretKey(response.data[0].secret_key ))
        }
      } catch (error) {
        console.log(error.response.data);
      }
  }

  useEffect(()=>{
      getAPI()
  },[])
  return (
    <DashboardLayout>
                <ToastContainer />
      <DashboardNavbar />
      <SoftBox py={3}>
      
      {
      !isApiGenerated ? 
      (
      <SoftBox mb={3}>
        <Grid container spacing={3}>
                <Grid item xs={6}>
                  <GenerateApi />
                </Grid>
          </Grid>
        </SoftBox>
        ): (
        <>
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "today's money" }}
                  count="$53,000"
                  percentage={{ color: "success", text: "+55%" }}
                  icon={{ color: "info", component: "paid" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "today's users" }}
                  count="2,300"
                  percentage={{ color: "success", text: "+3%" }}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "new clients" }}
                  count="+3,462"
                  percentage={{ color: "error", text: "-2%" }}
                  icon={{ color: "info", component: "emoji_events" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <MiniStatisticsCard
                  title={{ text: "sales" }}
                  count="$103,430"
                  percentage={{ color: "success", text: "+5%" }}
                  icon={{
                    color: "info",
                    component: "shopping_cart",
                  }}
                />
              </Grid>
            </Grid>
          </SoftBox>
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={7}>
                <BuildByDevelopers />
              </Grid>
              <Grid item xs={12} lg={5}>
                <WorkWithTheRockets />
              </Grid>
            </Grid>
          </SoftBox>
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={5}>
                <ReportsBarChart
                  title="active users"
                  description={
                    <>
                      (<strong>+23%</strong>) than last week
                    </>
                  }
                  chart={chart}
                  items={items}
                />
              </Grid>
              <Grid item xs={12} lg={7}>
                <GenerateApi />
              </Grid>
            </Grid>
          </SoftBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              {/* <Projects /> */}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {/* <OrderOverview /> */}
            </Grid>
          </Grid>
        </>
        )
        }
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
