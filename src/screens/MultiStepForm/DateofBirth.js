import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, MenuItem } from "@mui/material";;

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);


const DateOfBirth = ({ values, handleChange, handleBlur, touched, errors,onValidateAge  }) => {

  const[month, setMonth] = useState("");
  const[day, setDay] = useState("");
  const[year, setYear] = useState("");
  const[daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const days = new Date(values.year, values.month, 0).getDate();
    const daysArray = Array.from({ length: days }, (_, i) =>(i + 1).toString().padStart(2, "0"));
    setDaysInMonth(daysArray);
    // Ensure the current day is valid, reset if not
    if (values.day && !daysArray.includes(values.day)) {
      handleChange({ target: { name: "day", value: "" } });
    }
  }, [values.month, values.year, handleChange]);

  return (
    <Grid container spacing={1}>
      <Grid item md={12} xs={12}>
        <Typography variant="subtitle1" align="left" className="big_label">
          Date of birth
        </Typography>
      </Grid>

      <Grid item md={3} xs={4}>
        <Typography variant="subtitle1" align="left">
          Month
        </Typography>
        <TextField
          select
          fullWidth
          id="month"
          name="month"
          value={values.month}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.month && Boolean(errors.month)}
          helperText={touched.month && errors.month}
        >
          {months.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item md={3} xs={4}>
        <Typography variant="subtitle1" align="left">
          Day
        </Typography>
        <TextField
          select
          fullWidth
          id="day"
          name="day"
          value={values.day}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.day && Boolean(errors.day)}
          helperText={touched.day && errors.day}
        >
          {daysInMonth.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item md={6} xs={4}>
        <Typography variant="subtitle1" align="left">
          Year
        </Typography>
        <TextField
          select
          fullWidth
          id="year"
          name="year"
          value={values.year}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.year && Boolean(errors.year)}
          helperText={touched.year && errors.year}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default DateOfBirth;
