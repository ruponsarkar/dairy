import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';

function ApplyForm() {
  const [formData, setFormData] = useState({
    month: '',
    liter: ''
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add form submission logic here
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#f9f9f9'
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="month-label">Month</InputLabel>
        <Select
          labelId="month-label"
          id="month"
          name="month"
          value={formData.month}
          onChange={handleChange}
          label="Month"
        >
          {months.map((month, index) => (
            <MenuItem key={index} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Liter"
        id="liter"
        name="liter"
        type="number"
        value={formData.liter}
        onChange={handleChange}
        fullWidth
        InputProps={{ inputProps: { min: 0 } }} // Ensure the input is non-negative
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
}

export default ApplyForm;
