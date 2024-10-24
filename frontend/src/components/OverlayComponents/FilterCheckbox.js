import React, {useState} from "react";
import {Button, Checkbox, FormControlLabel, FormGroup} from "@mui/material";

const FilterCheckbox = () => {
    const [selectedOptions, setSelectedOptions] = useState({
        option1: false,
        option2: false,
        option3: false,
        option4: false,
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
        // 阻止默认表单提交行为
        event.preventDefault();
        // Get the selected options
        const selected = Object.entries(selectedOptions)
            .filter(([key, value]) => value)
            .map(([key]) => key);
        console.log("Selected Options:", selected);

        // Encode the selected options as query parameters
        const params = new URLSearchParams();
        selected.forEach(option => {
            params.append('selectedOptions', option);
        });

        // Send the selected options to the Flask backend
        fetch('http://127.0.0.1:5000/submit_options?${params.toString()}', {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // 处理响应
            })
            .then(data => {
                console.log("Response from backend:", data);
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
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
                    label="行业"
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
                    label="城市"
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
                    label="社保人数"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectedOptions.option4}
                            onChange={handleCheckboxChange}
                            name="option4"
                            color="primary"
                        />
                    }
                    label="年营业额"
                />
            </FormGroup>
            <Button type="submit" variant="contained" color="primary" sx={{marginTop: 2}}>
                Submit
            </Button>
        </form>
    );
};

export default FilterCheckbox;
