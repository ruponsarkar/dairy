import React from "react";
import Nav2 from "../../components/common/navbar";
import Footer from "../common/footer";
import { Paper, Button } from "@mui/material";


const Application = ({data}) => {





    return (
        <>
            {/* <Nav2 /> */}
            <div className="container">
                <div className="row py-3">
                    <Paper>
                        <div style={{ overflowX: 'auto' }}>
                            <div className="py-4">
                                <h3 className="text-center">
                                    Milk to Dairy Co-operative Societies
                                </h3>
                            </div>
                            <table className="py-3">
                                <tr>
                                    <th>Name of the applicant</th>
                                    <th>Father/Spouse's Name</th>
                                    <th>Date of Birth</th>
                                    <th>Gender of the applicant</th>
                                </tr>
                                <tr>
                                    <td>{data.name}</td>
                                    <td>{data.fathersName}</td>
                                    <td>{data.dob}</td>
                                    <td>{data.gender}</td>
                                </tr>
                                <tr>
                                    <th>12 digit AADHAAR number</th>
                                    <th>AADHAAR linked mobile number</th>
                                    <th>PAN number</th>
                                    <th>Voter ID number</th>
                                </tr>
                                <tr>
                                    <td>{data.aadhaarNo}</td>
                                    <td>{data.aadharMobile}</td>
                                    <td>{data.pan_number}</td>
                                    <td>{data.voterID}</td>
                                </tr>
                                <tr>
                                    <th>Area of residence</th>
                                    <th>District</th>
                                    <th>LAC</th>
                                    <th>Village</th>
                                </tr>
                                <tr>
                                    <td>{data.area}</td>
                                    <td>{data.district}</td>
                                    <td>{data.LAC}</td>
                                    <td>{data.village}</td>
                                </tr>
                                <tr>
                                    <th>Gaon Panchayat</th>
                                    <th>Block</th>
                                    <th>Pincode</th>
                                    <th>Police Station</th>
                                </tr>
                                <tr>
                                    <td>{data.gaon_panchayat}</td>
                                    <td>{data.block}</td>
                                    <td>{data.pincode}</td>
                                    <td>{data.police_station}</td>
                                </tr>
                                <tr>
                                    <th>Name of Dairy Co-operative Society</th>
                                    <th>Address of the Dairy Co-operative Society</th>
                                    <th>Registration number of Dairy Co-operative Society</th>
                                    <th>Name of the bank</th>
                                </tr>
                                <tr>
                                    <td>{data.name_of_co_operatice_society}</td>
                                    <td>{data.addree_of_co_operatice_society}</td>
                                    <td>----</td>
                                    <td>{data.bank_name}</td>
                                </tr>
                                <tr>
                                    <th>Name of the Account holder </th>
                                    <th>Bank Account Number</th>
                                    <th>IFSC code</th>
                                    <th>Milk Production Data per month (From April, 2024 to March 2024)</th>
                                </tr>
                                <tr>
                                    <td>{data.bank_account_holder_name}</td>
                                    <td>{data.bank_account_no}</td>
                                    <td>{data.ifsc_code}</td>
                                    <td>----</td>
                                </tr>

                                <tr>
                                    <th colspan="2">Submitted Date</th>
                                    <th colspan="2">Status</th>
                                </tr>
                                <tr>
                                    <td colspan="2">{data.created_at} </td>
                                    {/* <td colspan="2" className="text-danger"> Under Verification</td> */}
                                    <td colspan="2" className="text-success"> {data.status}</td>
                                </tr>
                            </table>
                        </div>

                    </Paper>

                    {/* <Paper>
                        <div className="p-3">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <strong>Status</strong> : Under Verification
                                </div>
                                <div>
                                    <Button>
                                    Print
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Paper> */}
                </div>
            </div>


            {/* <Footer /> */}
        </>
    );
};

export default Application;
