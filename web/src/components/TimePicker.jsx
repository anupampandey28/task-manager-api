import React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

const TimePicker = ({ value, onChange, minTime }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        label="Start Time"
        value={value}
        onChange={(newValue) => {
          if (newValue) onChange(newValue);
        }}
        ampm
        format="hh:mm A"
        minTime={minTime}
        slotProps={{
          textField: {
            fullWidth: true
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default TimePicker;