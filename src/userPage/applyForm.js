import React, { useState } from 'react';
import {Container, Toolbar,
  Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ApplyForm() {
  const [formData, setFormData] = useState({
    month: '',
    liter: ''
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const rows = [
    { date: '2024-08-10', liter: 50, amount: 1000, status: 'Approved' },
    { date: '2024-08-11', liter: 30, amount: 600, status: 'Pending' },
    { date: '2024-08-12', liter: 40, amount: 800, status: 'Rejected' },
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
    <div>
    
            <Toolbar sx={{ boxShadow: 3 }}>
                <Typography variant="h5" id="tableTitle" component="div">
                    Apply Subsidy
                </Typography>
            </Toolbar>
            <Paper className="p-2">
    <Toolbar>
        <Typography variant="h6" id="tableTitle" component="div">
            Apply for new subsidy
        </Typography>
    </Toolbar>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        maxWidth: 800,
        margin: '0 auto',
        padding: 3,
        // boxShadow: 3,
        // borderRadius: 2,
        // backgroundColor: '#f9f9f9'
      }}
    >
      <FormControl fullWidth size="small">
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
      <TextField size="small"
        label="Liter"
        id="liter"
        name="liter"
        type="number"
        value={formData.liter}
        onChange={handleChange}
        fullWidth
        InputProps={{ inputProps: { min: 0 } }} // Ensure the input is non-negative
      />
      <Button type="submit" className='px-4' variant="contained" color="primary" sx={{ alignSelf: 'center' }}>
        Submit
      </Button>
    </Box>

    <hr></hr>
    <Toolbar>
        <Typography variant="h6" id="tableTitle" component="div">
            Subsidy Apply history
        </Typography>
    </Toolbar>

    <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sl.No.</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Liter</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.liter}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Paper>
      </div>
  );
}

export default ApplyForm;
