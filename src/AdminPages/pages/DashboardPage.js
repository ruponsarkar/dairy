import React, { useEffect, useState } from "react";
import CountStatus from "../../components/home/countStatus";
import { Paper } from "@mui/material";
import DashboardTable from "./dashboardTable";
// Chart JS
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "../../charts/PieChart";
import BarChart from "../../charts/BarChart";

Chart.register(CategoryScale);

const myData = [
    {
        id: 1,
        year: 2016,
        userGain: 80000,
        userLost: 823
    },
    {
        id: 2,
        year: 2017,
        userGain: 45677,
        userLost: 345
    },
    {
        id: 3,
        year: 2018,
        userGain: 78888,
        userLost: 555
    },
    {
        id: 4,
        year: 2019,
        userGain: 90000,
        userLost: 4555
    },
    {
        id: 5,
        year: 2020,
        userGain: 4300,
        userLost: 234
    }
];

const DashboardPage = () => {
    const [chartData, setChartData] = useState({
        labels: myData.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained ",
                data: myData.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "gray",
                borderWidth: 1
            }
        ]
    });

    return (

        <section className="dash m-0 p-0">
            <div className="container">
                <CountStatus />
                <div className="row">
                    <div className="col-md-6 p-1">
                        <Paper>
                        <div class="counter bg-light">
                            <div class="panel panel-default">
                                <div class="panel-heading ">
                                    Subsidy applications(District Wise)
                                    <select>
                                        <option value="Guwahati">Guwahati</option>
                                    </select>
                                </div>
                                <div class="panel-body">
                                    <BarChart chartData={chartData} />
                                </div>

                            </div>
                            {/* <PieChart chartData={chartData} /> */}

                        </div>
                        </Paper>
                    </div>
                    <div className="col-md-6 p-1">
                        <div class="counter text-center">
                            <BarChart chartData={chartData} />

                        </div>
                    </div>
                </div>
                <DashboardTable />
                {/* <PieChart chartData={chartData} /> */}
                {/* <div className="row my-5 justify-content-center">
                    <div className="reports my-2">
                        <h3 className="p-3 text-center">Status Reports</h3>
                        <div className="d-flex p-3" style={{ 'flexWrap': 'wrap' }}>
                            <div className="col-md-6">
                                <div className="event text-center m-2">
                                    <StyleIcon /><br />
                                    <h6 className="py-2"><strong>Total Applied</strong></h6>
                                    <p className="text-center">{count && count.tot_journal}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="blogs text-center m-2">
                                    <PublishIcon /><br />
                                    <h6 className="py-2"><strong>Total Approved</strong></h6>
                                    <p className="text-center">{count && count.tot_pub}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="media text-center m-2">
                                    <RateReviewIcon /><br />
                                    <h6 className="py-2"><strong>Total Rejected</strong></h6>
                                    <p className="text-center">{count && count.tot_cat}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="paper text-center m-2">
                                    <ContactsIcon /><br />
                                    <h6 className="py-2"><strong>Total Pending</strong></h6>
                                    <p className="text-center">{count && count.tot_contact}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}


                <br />
                <br />
                <br />
                <br />
                <br />


            </div>
        </section>
    )
}

export default DashboardPage;