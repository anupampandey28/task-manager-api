import React from "react";
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const DatePicker = ({ value, onChange }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label="Task Date"
        value={value || null}
        onChange={onChange}
        minDate={dayjs()}
        format="DD MMM YYYY"
        slotProps={{ textField: { fullWidth: true } }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;