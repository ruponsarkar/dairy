import React from "react";
import Nav2 from "../../components/common/navbar";
import Footer from "../common/footer";
import { Paper, Button } from "@mui/material";


const Application = () => {





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
                                    <td>Centro comercial Moctezuma</td>
                                    <td>Francisco Chang</td>
                                    <td>Mexico</td>
                                    <td>Mexico</td>
                                </tr>
                                <tr>
                                    <th>12 digit AADHAAR number</th>
                                    <th>AADHAAR linked mobile number</th>
                                    <th>PAN number</th>
                                    <th>Voter ID number</th>
                                </tr>
                                <tr>
                                    <td>Island Trading</td>
                                    <td>Helen Bennett</td>
                                    <td>UK</td>
                                    <td>UK</td>
                                </tr>
                                <tr>
                                    <th>Area of residence</th>
                                    <th>District</th>
                                    <th>LAC</th>
                                    <th>Village</th>
                                </tr>
                                <tr>
                                    <td>Laughing Bacchus Winecellars</td>
                                    <td>Yoshi Tannamuri</td>
                                    <td>Canada</td>
                                    <td>Canada</td>
                                </tr>
                                <tr>
                                    <th>Gaon Panchayat</th>
                                    <th>Block</th>
                                    <th>Pincode</th>
                                    <th>Police Station</th>
                                </tr>
                                <tr>
                                    <td>Magazzini Alimentari Riuniti</td>
                                    <td>Giovanni Rovelli</td>
                                    <td>Italy</td>
                                    <td>Italy</td>
                                </tr>
                                <tr>
                                    <th>Name of Dairy Co-operative Society</th>
                                    <th>Address of the Dairy Co-operative Society</th>
                                    <th>Registration number of Dairy Co-operative Society</th>
                                    <th>Name of the bank</th>
                                </tr>
                                <tr>
                                    <td>Magazzini Alimentari Riuniti</td>
                                    <td>Giovanni Rovelli</td>
                                    <td>Italy</td>
                                    <td>Italy</td>
                                </tr>
                                <tr>
                                    <th>Name of the Account holder </th>
                                    <th>Bank Account Number</th>
                                    <th>IFSC code</th>
                                    <th>Milk Production Data per month (From April, 2024 to March 2024)</th>
                                </tr>
                                <tr>
                                    <td>Magazzini Alimentari Riuniti</td>
                                    <td>Giovanni Rovelli</td>
                                    <td>Italy</td>
                                    <td>Italy</td>
                                </tr>

                                <tr>
                                    <th colspan="2">Submitted Date</th>
                                    <th colspan="2">Status</th>
                                </tr>
                                <tr>
                                    <td colspan="2">20 July 2024 </td>
                                    <td colspan="2" className="text-danger"> Under Verification</td>
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
