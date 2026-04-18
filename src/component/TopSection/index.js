import { AppBar, Button, Grid, Typography } from '@mui/material';
import React from 'react'
import logo from "../../images/logo.png";
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/index.js';


const TopSection = ()=> {

const navigate = useNavigate();
const loginData = useSelector((state) => state.auth.isAuthenticated);
const dispatch = useDispatch();

    return (
    <div>
     {loginData ? <Header/>:
     <div>  
     <Grid
          item
          xs={12}
          className="login_top_section"
          display="flex"
          style={{justifyContent:"space-between",marginTop:"10px"}}
        >
           <div>
           <Typography variant="h6" noWrap>
              <img
                className="header-logo"
                src={logo}
                alt="logo"
                onClick={() => {
                  navigate("/");
                }}
              />
            </Typography>
            </div>
            {isMobile?
          <div
            className="top_buttons"
            style={{marginRight: "20px",display:"flex",justifyContent:"space-between"}}
          >
            <Button
              color="primary"
              variant="contained"
              style={{ marginRight:20}}
              onClick={() => {
                navigate("/login");
              }}
            >
              <Typography fontWeight={600}>Login</Typography>
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                navigate("/signup");
              }}
            >
              <Typography fontWeight={600}>Sign up</Typography>
            </Button>
          </div>
          :
          <div
            className="top_buttons"
            style={{ paddingTop: "15px", marginRight: "80px"}}
          >
            <Button
              color="primary"
              variant="contained"
              style={{marginRight:20}}
              onClick={() => {
                navigate("/login");
              }}
            >
              <Typography fontWeight={600}>Login</Typography>
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                navigate("/signup");
              }}
            >
              <Typography fontWeight={600}>Sign up</Typography>
            </Button>
          </div>
          }
     </Grid>
     </div>
    }

    </div>
  )
}

export default TopSection;
