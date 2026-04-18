import React from "react";
import "./../Login/login.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";



const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});

const Register = () => {
    const formik = useFormik({
        initialValues: {
            email: "foobar@example.com",
            password: "foobar",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <>
            <Grid container spacing={2} justifyContent="center" rowSpacing={1}>
                <Grid item md={5}>
                    <div className="login_page">

                        {/* <Typography variant="h4" component="h2" gutterBottom>
        Login Page
      </Typography> */}
                        <img
                            src={require("../../images/logo.png")}
                            className="logo"
                            alt="logo"
                        />
                        <h3>Register</h3>
                        <p>Grab your Free Coins, Start Winning Today!</p>

                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={5} rowSpacing={1}>
                                <Grid item md={6}>
                                    <Typography
                                        variant="subtitle1"
                                        align="left"
                                    >
                                        First Name
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        name="email"
                                        placeholder="Enter your First Name"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}

                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <Typography
                                        variant="subtitle1"
                                        align="left"
                                    >
                                        Last Name
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="password"
                                        name="password"
                                        placeholder="Enter your Last Name"
                                        type="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <Typography
                                        variant="subtitle1"
                                        align="left"
                                    >
                                        Country
                                    </Typography>
                                    <FormControl fullWidth>

                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography
                                        variant="subtitle1"
                                        align="left"
                                    >
                                        State
                                    </Typography>
                                    <FormControl fullWidth>

                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                        >
                                            <MenuItem value={10} selected disabled>Select State</MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography
                                        variant="subtitle1"
                                        align="left"
                                        className="big_label"
                                    >
                                        Date of birth
                                    </Typography>

                                </Grid>
                                <Grid item md="3">
                                    <Typography
                                        variant="subtitle1"
                                        align="left"
                                    >
                                        Month
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="mm"
                                        name="text"
                                        placeholder="MM"

                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}


                                    />
                                </Grid>
                                <Grid item md="3">
                                    <Typography
                                        variant="subtitle1"
                                        align="left"
                                    >
                                        Day
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="mm"
                                        name="text"
                                        placeholder="DD"

                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}


                                    />
                                </Grid>
                                <Grid item md="6">
                                    <Typography
                                        variant="subtitle1"
                                        align="left"
                                    >
                                        Year
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="mm"
                                        name="text"
                                        placeholder="YYYY"

                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}


                                    />
                                </Grid>
                                <Grid item md="12">
                                    <Typography
                                        variant="subtitle1"
                                        align="left"
                                    >
                                        Referred by (optional)
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id="mm"
                                        name="text"
                                        placeholder="Enter your referral code"

                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}


                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <div className="condition_check">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="" />
                                            <label className="form-check-label" for=""> I confirm the following: I am at least 18 years old; I am not resident in the state of Washington,
                                                Nevada, Michigan, Idaho or Montana; I accept the <Link to="/">Terms and Conditions</Link>  and  <Link to="/">Privacy Policy</Link>. </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="" />
                                            <label className="form-check-label" for="">Receive promotional emails </label>
                                        </div>
                                    </div>

                                </Grid>
                            </Grid>

                            <Button color="primary" variant="contained" type="submit">
                            Complete sign up
                            </Button>

                            <p className="sign_p">Already have an account?  <Link to="/signUp">Log in</Link></p>

                        </form>
                    </div>
                </Grid>
            </Grid>

        </>
    );
};

export default Register;
