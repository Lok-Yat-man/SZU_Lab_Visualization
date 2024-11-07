import React, {useState} from "react";
import {Button, Checkbox, FormControlLabel, FormGroup} from "@mui/material";

const FilterCheckbox = ({onSubmit}) => {
    const [selectedOptions, setSelectedOptions] = useState({
        cate_first: false, city: false, social_security_staff_num: false, reg_capital_amount_10k: false,
    });

    // Handle checkbox change
    const handleCheckboxChange = (event) => {
        setSelectedOptions({
            ...selectedOptions, [event.target.name]: event.target.checked,
        });
    };

    // Handle form submit
    const handleSubmit = (event) => {
        // 阻止默认表单提交行为
        event.preventDefault();
        // Get the selected options
        const selected = Object.entries(selectedOptions)
            .filter(([key, value]) => value)
            .map(([key]) => key);
        console.log("Selected Options:", selected);

        onSubmit(selected);
    };

    return (<form onSubmit={handleSubmit}>
        <FormGroup>
            <FormControlLabel
                control={<Checkbox
                    checked={selectedOptions.cate_first}
                    onChange={handleCheckboxChange}
                    name="cate_first"
                    color="primary"
                />}
                label="行业"
            />
            <FormControlLabel
                control={<Checkbox
                    checked={selectedOptions.city}
                    onChange={handleCheckboxChange}
                    name="city"
                    color="primary"
                />}
                label="城市"
            />
            <FormControlLabel
                control={<Checkbox
                    checked={selectedOptions.social_security_staff_num}
                    onChange={handleCheckboxChange}
                    name="social_security_staff_num"
                    color="primary"
                />}
                label="社保人数"
            />
            <FormControlLabel
                control={<Checkbox
                    checked={selectedOptions.reg_capital_amount_10k}
                    onChange={handleCheckboxChange}
                    name="reg_capital_amount_10k"
                    color="primary"
                />}
                label="年营业额"
            />
        </FormGroup>
        <Button type="submit" variant="contained" color="primary" sx={{marginTop: 2}}>
            Submit
        </Button>
    </form>);
};

export default FilterCheckbox;
