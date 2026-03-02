import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

const DTPicker = ({ label, date, onChange, minTime }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        label={label}
        value={date}
        onChange={onChange}
        format="hh:mm A"
        ampm={true}
        minTime={minTime}
        slotProps={{
          popper: {
            sx: {
              "& .MuiPaper-root": {
                backgroundColor: "#fff",
                color: "black",
                borderRadius: "20px",
                padding: "20px",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DTPicker;