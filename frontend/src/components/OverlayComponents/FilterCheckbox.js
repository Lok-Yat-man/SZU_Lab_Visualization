import React, { useState } from "react";
import { Checkbox, Button, FormControlLabel, FormGroup, Typography } from "@mui/material";

const FilterCheckbox = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    setSelectedOptions({
      ...selectedOptions,
      [event.target.name]: event.target.checked,
    });
  };

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // Get the selected options
    const selected = Object.entries(selectedOptions)
      .FilterCheckboxter(([key, value]) => value)
      .map(([key]) => key);
    console.log("Selected Options:", selected);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedOptions.option1}
              onChange={handleCheckboxChange}
              name="option1"
              color="primary"
            />
          }
          label="Option 1"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedOptions.option2}
              onChange={handleCheckboxChange}
              name="option2"
              color="primary"
            />
          }
          label="Option 2"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedOptions.option3}
              onChange={handleCheckboxChange}
              name="option3"
              color="primary"
            />
          }
          label="Option 3"
        />
      </FormGroup>
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Submit
      </Button>
    </form>
  );
};

export default FilterCheckbox;
