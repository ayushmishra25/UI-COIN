// CustomDatePicker.js
import React from 'react';
import { TextField, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';


const CustomDatePicker = ({ value, onChange,minDate, maxDate,disableToDate }) => {

  const handleDateChange = (newDate) => {
    if (newDate) {
      const formattedDate = moment(newDate).format('YYYY-MM-DD'); 
      onChange(formattedDate);
    } else {
      onChange(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid item>
        <DatePicker
          value={value ? new Date(value) : null}
          minDate={minDate}
          maxDate={maxDate}
          onChange={handleDateChange}
          shouldDisableDate={disableToDate}
          renderInput={(params) => (
            <TextField 
              {...params} 
              size="small"
              error={false}
              sx={{ height: '40px'}} 
            />
          )}
        />
      </Grid>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
