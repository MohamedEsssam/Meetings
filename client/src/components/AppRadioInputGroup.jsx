import React from "react";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const AppRadioInputGroup = ({
  radioValue,
  setRadioValue,
  inputValue,
  setInputValue,
}) => {
  const handleChange = ({ target }) => {
    setRadioValue(target.value);
  };

  const handleChangeInput = ({ target }) => {
    setInputValue(target.value);
  };

  return (
    <>
      <FormControl component="fieldset">
        <RadioGroup
          style={{
            paddingTop: "10px",
            paddingLeft: "10px",
            margin: "10px",
            flexDirection: "row-reverse",
            border: "1px solid",
            borderRadius: "35px",
            backgroundColor: "#5bc0de",
            opacity: ".7",
          }}
          onChange={handleChange}
          value={radioValue}
        >
          <FormControlLabel
            value=""
            control={<Radio />}
            label="كل الاجتماعات"
          />
          <FormControlLabel
            value="Accepted"
            control={<Radio />}
            label="تم السماح بالدخول"
          />
          <FormControlLabel
            value="Rejected"
            control={<Radio />}
            label="تم الرفض"
          />
          <FormControlLabel
            value="Delayed"
            control={<Radio />}
            label="تم التأجيل"
          />
          <FormControlLabel value="Exit" control={<Radio />} label="تم انهاء" />
          <FormControlLabel
            value="Pending"
            control={<Radio />}
            label="لازال قيد النتظار"
          />
        </RadioGroup>
      </FormControl>
      <TextField
        variant="outlined"
        label="ابحث بواسطة اسم الشخص"
        style={{ margin: "15px" }}
        color="secondary"
        onChange={handleChangeInput}
      />
    </>
  );
};

export default AppRadioInputGroup;
