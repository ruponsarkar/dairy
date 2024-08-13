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
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import Application from "../../components/register/application";
import api from "../../API/api";
import Swal from "sweetalert2";
import CancelIcon from "@mui/icons-material/Cancel";
import Checkbox from '@mui/material/Checkbox';
import { CSVLink, CSVDownload } from "react-csv";
import PaymentsIcon from "@mui/icons-material/Payments";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.blue,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));



const defaultdistricts = [
    "Baksa",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup Metropolitan",
    "Kamrup",
    "Karbi Anglong",
    "Karimganj",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Nagaon",
    "Nalbari",
    "Dima Hasao",
    "Sivasagar",
    "Sonitpur",
    "South Salmara-Mankachar",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong",
];

const statuses = ["Approve", "Reject", "Draft", "Incompleted"];


const MasterTable = () => {
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
        setRequestData({
            ...requestData,
            filterBy: "district",
            filterData: event.target.value,
        });
        setSelectedStatus("");
    };


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [data, setData] = useState();
    const [status, setStatus] = useState();
    const [remark, setRemark] = useState();
    const [districts, setDistricts] = useState(defaultdistricts);
    const [openImgView, setOpenImgView] = useState(false);
    const [selectedImg, setSelectedImg] = useState();
    const [month, setMonth] = useState();
    const [amountPerLitter, setAmountPerLitter] = useState(5);




    const [requestData, setRequestData] = useState({
        limit: 100,
        offset: 0,
        user: JSON.parse(sessionStorage.getItem("user")),
        filterBy: "",
        filterData: "",
    });

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem("user")).role === "Admin") {
            setSelectedDistrict(JSON.parse(sessionStorage.getItem("user")).district);
            setDistricts([JSON.parse(sessionStorage.getItem("user")).district]);
        }
    }, []);

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        setRequestData({
            ...requestData,
            filterBy: "status",
            filterData: event.target.value,
        });
        setSelectedDistrict("");
    };

    const handleClearFilter = () => {
        setRequestData({
            ...requestData,
            filterBy: "",
            filterData: "",
        });
        setSelectedDistrict("");
        setSelectedStatus("");
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
        getFrom();
    }, [requestData, selectedDistrict]);

    const handleUpdate = () => {
        setOpen(false);
        if (status === "Reject") {
            if (!remark) {
                Swal.fire("Please enter any remarks for Rejection ");
                return;
            }
        } else {
            setRemark("");
        }

        if (status) {
            console.log("mobileNumber: ", selectedRow.mobileNumber);
            console.log("status: ", status);
            console.log("remarks: ", remark);

            const data = {
                mobileNumber: selectedRow.mobileNumber,
                status: status,
                remark: remark,
            };
            api
                .updateFormStatus(data)
                .then((res) => {
                    console.log("final response :", res);
                    Swal.fire("Successfully Updated !");
                    getFrom();
                })
                .catch((err) => {
                    console.log("err : ", err);
                    Swal.fire("Something went wrong !");
                });
        }
    };

    const getFrom = () => {

        api
            .getMaster(requestData)
            .then((res) => {
                console.log("res :", res);
                setData(res.data.data);
            })
            .catch((err) => {
                console.log("err: ", err);
            });
    };


    const handleAddLitter = (id, litter) => {
        const updatedItems = data.map(item =>
            item.id === id ? { ...item, litter: litter } : item
        );
        setData(updatedItems);
    }

    const handleApproveAll = () => {

        if (!month) {
            Swal.fire({
                title: "Month Not selected !",
                text: "You must selct a month!",
                icon: "warning"
            });
            return;
        }


        console.log(month);
        console.log(data);
        let selectedData = data.filter((e) => e.litter && e.isApprove !== 'Approve');
        console.log("selectedData", selectedData);


        api.postMonthlyReport(selectedData, month, amountPerLitter).then((res) => {
            console.log("postMonthlyReport: ", res);
            Swal.fire({
                title: "Approved for Payment!",
                text: "Data sent for payment!",
                icon: "success"
            });

            getMasterWithReport(month)
            return;
        })
            .catch((err) => {
                console.log("err postMonthlyReport", err);
            })
    }

    const handleChangeMonth = (e) => {
        setMonth(e.target.value)
        getMasterWithReport(e.target.value);
    }

    const getMasterWithReport = (month) => {

        api.getMasterWithReport(month).then((res) => {
            console.log("getMasterWithReport", res.data.data);
            setData(res.data.data)
        })
            .catch((err) => {
                console.log("getMasterWithReport err", err);
            })
    }

    return (
        <Paper className="p-2">
            <Toolbar>
                <Typography variant="h6" id="tableTitle" component="div">
                    Master Data
                </Typography>
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>



            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    margin: "20px 0",
                    "@media (max-width: 600px)": {
                        flexDirection: "column",
                        alignItems: "flex-start",
                    },
                }}
            >
                <Box sx={{ display: "flex", gap: 2 }}>
                    <FormControl sx={{ minWidth: 180, maxWidth: 200 }} size="small">
                        <InputLabel id="assam-district-label">Select District</InputLabel>
                        <Select
                            labelId="assam-district-label"
                            id="assam-district"
                            value={selectedDistrict}
                            label="Select District"
                            onChange={handleDistrictChange}
                        >
                            {districts &&
                                districts.map((district) => (
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
                    {requestData.filterBy && (
                        <IconButton onClick={handleClearFilter}>
                            <CancelIcon />
                        </IconButton>
                    )}
                </Box>

                <div>
                    {data &&
                        <div>
                            <CSVLink data={data} filename={"AHVD_DATA.csv"}>
                                Download Data
                            </CSVLink>
                        </div>
                    }

                </div>
            </Box>

            <div className="my-3 d-flex gap-3">
                <input type="month" name="" className="form-control col-2" id="" onChange={(e) => handleChangeMonth(e)} />
                <div>
                    <Button variant="contained" onClick={handleApproveAll}>Approve for Payment for SLC</Button>
                </div>
            </div>



            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size="medium"
                >


                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell>Applicant Name</StyledTableCell>
                            <StyledTableCell>Co-operatice Name</StyledTableCell>
                            <StyledTableCell>Registration no</StyledTableCell>
                            <StyledTableCell>District</StyledTableCell>
                            <StyledTableCell>Litter</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data &&
                            data.map((row, index) => {
                                return (
                                    <TableRow hover tabIndex={-1} key={row.name}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.name_of_co_operatice_society}</TableCell>
                                        <TableCell>{row.registration_no_of_co_operatice_society}</TableCell>
                                        <TableCell>{row.district}</TableCell>
                                        <TableCell>
                                            <input type="number" name="" disabled={row.isApprove === 'Approve' ? true : false} value={row.litter ? row.litter : ''} id="" onChange={(e) => handleAddLitter(row.id, e.target.value)} />
                                        </TableCell>
                                        <TableCell>


                                            <span className={`${row.isApprove === 'Pending' || !row.isApprove ? 'bg-warning' : 'bg-success'} rounded px-2`}>
                                                {row.isApprove ? row.isApprove : 'Pending'}
                                            </span>

                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                size="small"
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

                <div>
                    {!data &&
                        <div className="text-center">
                            <h3>Data not found</h3>
                        </div>
                    }
                </div>


            </TableContainer>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="protein-modal-title"
                fullWidth={true}
                maxWidth={"lg"}
            >
                <DialogTitle id="protein-modal-title"> Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            <Application data={selectedRow} />

                            {selectedRow && (
                                <div className="documents d-flex justify-content-center border p-3 gap-4">
                                    <div className="text-center card">
                                        <h3>Pan Card</h3>
                                        {/* <a href={`http://localhost:8800/${selectedRow.panCard}`}> */}
                                        <img
                                            src={`http://localhost:8800/${selectedRow.panCard}`}
                                            className="img"
                                            alt=""
                                            onClick={() => {
                                                setOpenImgView(true);
                                                setSelectedImg(
                                                    `http://localhost:8800/${selectedRow.panCard}`
                                                );
                                            }}
                                        />
                                        {/* </a> */}
                                    </div>
                                    <div className="text-center card">
                                        <h3>Aadhar Card</h3>
                                        <img
                                            src={`http://localhost:8800/${selectedRow.aadharCard}`}
                                            className="img"
                                            alt=""
                                            onClick={() => {
                                                setOpenImgView(true);
                                                setSelectedImg(
                                                    `http://localhost:8800/${selectedRow.aadharCard}`
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="text-center card">
                                        <h3>Passbook</h3>
                                        <img
                                            src={`http://localhost:8800/${selectedRow.passbook}`}
                                            className="img"
                                            alt=""
                                            onClick={() => {
                                                setOpenImgView(true);
                                                setSelectedImg(
                                                    `http://localhost:8800/${selectedRow.passbook}`
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="d-flex justify-content-center gap-3 m-3">
                                <div>
                                    <select
                                        name=""
                                        id=""
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="form-control"
                                    >
                                        <option value="">---select---</option>
                                        <option value="Approve">Approve</option>
                                        <option value="Reject">Reject</option>
                                    </select>
                                </div>
                                {status === "Reject" && (
                                    <div>
                                        <input
                                            type="text"
                                            onChange={(e) => setRemark(e.target.value)}
                                            className="form-control"
                                            placeholder="Remark"
                                            name=""
                                            id=""
                                        />
                                    </div>
                                )}
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleUpdate}
                                        disabled={status ? false : true}
                                    >
                                        Submit
                                    </Button>
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

            {/* for image view  */}

            <Dialog
                open={openImgView}
                onClose={() => setOpenImgView(false)}
                aria-labelledby="protein-modal-title"
                fullWidth={true}
                maxWidth={"lg"}
            >
                <DialogContent>
                    <DialogContentText>
                        <div className="text-center">
                            <img src={`${selectedImg}`} className="img-fluid" alt="" />
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Paper>
    );
};

export default MasterTable;
