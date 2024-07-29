// ProfessionalTable.js

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Link,
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from "@mui/icons-material/FilterList";
import Application from "../../components/register/application";
import api from "../../API/api";
import Swal from "sweetalert2";



const districts = [
  'Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang',
  'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Goalpara', 'Golaghat', 'Hailakandi',
  'Hojai', 'Jorhat', 'Kamrup Metropolitan', 'Kamrup', 'Karbi Anglong', 'Karimganj',
  'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Dima Hasao',
  'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'
];

const statuses = [
  'Active', 'Inactive', 'Pending', 'Completed', 'Cancelled'
];





const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Name of the applicant",
    },
    {
      id: "calories",
      numeric: true,
      disablePadding: false,
      label: "PAN number",
    },
    {
      id: "fat",
      numeric: true,
      disablePadding: false,
      label: "Area of residence",
    },
    { id: "District", numeric: true, disablePadding: false, label: "District" },
    { id: "Village", numeric: true, disablePadding: false, label: "Village" },
    { id: "Status", numeric: true, disablePadding: false, label: "Status" },
    { id: "Action", numeric: true, disablePadding: false, label: "Action" },
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box
                  component="span"
                  sx={{
                    border: 0,
                    clip: "rect(0 0 0 0)",
                    height: 1,
                    margin: -1,
                    overflow: "hidden",
                    padding: 0,
                    position: "absolute",
                    top: 20,
                    width: 1,
                  }}
                >
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const NewRequest = () => {

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };



  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState();
  const [status, setStatus] = useState();
  const [remark, setRemark] = useState();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  const handleClickOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setSelectedRow(null);
  };

  useEffect(() => {
    getFrom()
  }, [])
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log("user===>>>", user.role);
  }, [])

  const handleUpdate = () => {
    if (status === 'reject') {
      if (!remark) {
        Swal.fire("Please enter any remarks for rejection ");
        setOpen(false)
        return;
      }
    }
    else {
      setRemark('');
    }

    if (status) {
      console.log("mobileNumber: ", selectedRow.mobileNumber);
      console.log("status: ", status);
      console.log("remarks: ", remark);


      const data = {
        mobileNumber: selectedRow.mobileNumber,
        status: status,
        remark: remark,
      }
      api.updateFormStatus(data).then((res) => {
        console.log("final response :", res);
        Swal.fire('Successfully Updated !');

      })
        .catch((err) => {
          console.log("err : ", err);
          Swal.fire('Something went wrong !');
        })

    }



  }

  const getFrom = () => {
    const data = {
      limit: 5,
      offset: 0
    }
    api.getFrom(data).then((res) => {
      console.log("res :", res);
      setData(res.data.data)
    })
      .catch((err) => {
        console.log("err: ", err);
      })
  }

  return (
    <Paper className="p-2">

      <Toolbar>
        <Typography variant="h6" id="tableTitle" component="div">
          Request Receied
        </Typography>
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          margin: '20px 0',
          '@media (max-width: 600px)': {
            flexDirection: 'column',
            alignItems: 'flex-start',
          },
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 180, maxWidth: 200 }} size="small">
            <InputLabel id="assam-district-label">Select District</InputLabel>
            <Select
              labelId="assam-district-label"
              id="assam-district"
              value={selectedDistrict}
              label="Select District"
              onChange={handleDistrictChange}
            >
              {districts.map((district) => (
                <MenuItem key={district} value={district}>
                  {district}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 180, maxWidth: 200 }} size="small">
            <InputLabel id="status-label">Select Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={selectedStatus}
              label="Select Status"
              onChange={handleStatusChange}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Link href="https://www.example.com" underline="none">
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: 40,
              minWidth: 120,
              '@media (max-width: 600px)': {
                width: '100%',
                marginTop: 1,
              },
            }}
          >
            <DownloadIcon />
            Download Reports
          </Button>
        </Link>
      </Box>

      {/* 
    <div className="p-3 float-end">
      <a className="btn text-primary" role="button" href="/assets/data.xlsx"> <DownloadIcon/> Download Reports</a>
    </div> */}

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />

          <TableBody>
            {data &&
              data.map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.pan_number}</TableCell>
                    <TableCell align="right">{row.area}</TableCell>
                    <TableCell align="right">{row.district}</TableCell>
                    <TableCell align="right">{row.village}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleClickOpen(row)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="protein-modal-title"
        fullWidth={true}
        maxWidth={'lg'}
      >
        <DialogTitle id="protein-modal-title"> Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>

              <Application data={selectedRow} />

              {selectedRow &&
                <div className="documents d-flex justify-content-center border p-3">
                  <div className="text-center">
                    <h3>Pan Card</h3>
                    <img src={`http://localhost:8800/${selectedRow.panCard}`} style={{maxWidth: '300px'}} alt="" />
                  </div>
                  <div className="text-center">
                    <h3>Aadhar Card</h3>
                    <img src={`http://localhost:8800/${selectedRow.aadharCard}`} style={{maxWidth: '300px'}} alt="" />
                  </div>
                  <div className="text-center">
                    <h3>
                      Passbook
                    </h3>
                    <img src={`http://localhost:8800/${selectedRow.passbook}`} style={{maxWidth: '300px'}} alt="" />
                  </div>
                </div>
              }

              <div className="d-flex justify-content-center gap-3 m-3">
                <div>
                  <select name="" id="" onChange={(e) => setStatus(e.target.value)} className="form-control">
                    <option value="">---select---</option>
                    <option value="approve">Approve</option>
                    <option value="reject">Reject</option>
                  </select>
                </div>
                {status === 'reject' &&
                  <div>
                    <input type="text" onChange={(e) => setRemark(e.target.value)} className="form-control" placeholder="Remark" name="" id="" />
                  </div>
                }
                <div>
                  <Button variant="contained" onClick={handleUpdate} disabled={status ? false : true}>Submit</Button>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default NewRequest;
