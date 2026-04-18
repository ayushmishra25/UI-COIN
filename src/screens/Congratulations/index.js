import React from "react";
import "./../Login/login.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLoginData } from "../../redux/Reducers/AuthReducer/authSplice";
import { Helmet } from "react-helmet";

const Congratulations = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.auth?.IsLoginData);

  return (
    <>
          <Helmet>
            <title>Congratulations - Account Created Successfully</title>
            <meta name="description" content="Your Spinsaga account has been created. Start playing and winning now!" />
            <meta name="robots" content="noindex, nofollow" />
          </Helmet>
      <Grid container spacing={2} justifyContent="center" rowSpacing={1} className="login_port">
        <Grid item md={5}>
          <div className="login_page form_logout congrat_page">
            <img
              src={require("../../images/logo.png")}
              className="logo"
              alt="logo"
            />
            <div className="thanks_div">
              <img
                src={require("../../images/thanks.png")}
                className="logo"
                alt="logo"
              />
              <h2>Congratulations!</h2>
              {/* <p>
                We've sent a verification link to {data?.email} <br />
                Please click "Verify" in the verification email to complete the
                registration. <br />
                Don't forget to check your junk mail as well in case you cannot
                see the email.
              </p> */}
              <p style={{fontSize:"20px",fontWeight:"600"}}>
                 Your account has been successfully created!
              </p>
            </div>

            <div className="space_div">
              <Button
                color="primary"
                variant="contained"
                type="submit"
                style={{marginTop:"0px!important"}}
                onClick={() => {
                  navigate({
                    pathname: "/",
                    search: "?signup=complete",
                  });
                  dispatch(setLoginData({ user: data, isAuthenticated: true }));
                }}
              >
                Continue
              </Button>
            </div>


            <Typography variant="body1" className="sign_p">
              NEED HELP? Contact us{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }}   onClick={() => {
                  navigate("/contact-us");
                  dispatch(setLoginData({ user: data, isAuthenticated: true }));
                }}>
                HERE
              </span>{" "}
              24/7
            </Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Congratulations;
