import React, { useEffect, useState } from "react";
import CountStatus from "../../components/home/countStatus";
import { Paper } from "@mui/material";
import DashboardTable from "./dashboardTable";
import Loader from "../../components/pannel/loader";
// Chart JS
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "../../charts/PieChart";
import BarChart from "../../charts/BarChart";
import api from "../../API/api";

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

const allDistricts = [
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
const DashboardPage = () => {
    const [loading, setLoading] = useState(false);
    const [userDistrict, setUserDistrict] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [dcsList, setDcsList] = useState([]);
    const [isGraph1, setIsGraph1] = useState(true);
    const [isGraph2, setIsGraph2] = useState(true);
    const [graph1_Data, setGraph1_Data]=useState([
        {
            title: 'Total Applications',
            count: 0
        },
        {
            title: 'Approved',
            count: 0
        },
        {
            title: 'Rejected',
            count: 0
        },
        {
            title: 'Draft',
            count: 0
        },
        {
            title: 'Incomplete',
            count: 0
        }
    ]);
    const [graph2_Data, setGraph2_Data]=useState([
        {
            title: 'Total Applications',
            count: 7
        },
        {
            title: 'Approved',
            count: 3
        },
        {
            title: 'Rejected',
            count: 1
        },
        {
            title: 'Draft',
            count: 1
        },
        {
            title: 'Incomplete',
            count: 2
        }
    ]);
    const [chartData, setChartData] = useState({
        labels: graph1_Data.map((data) => data.title),
        datasets: [
            {
                label: "District Wise Statistics",
                data: graph1_Data.map((data) => data.count),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#50AF95",
                    "#Ff0000",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "gray",
                borderWidth: 1
            }
        ]
    });

    const [chartData2, setChartData2] = useState({
        labels: graph2_Data.map((data) => data.title),
        datasets: [
            {
                label: "DCS Wise Statistics",
                data: graph2_Data.map((data) => data.count),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#50AF95",
                    "#Ff0000",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "gray",
                borderWidth: 1
            }
        ]
    });

    useEffect(() => {
        init();
    }, [selectedDistrict]);

    const init = () => {
        let districts = JSON.parse(sessionStorage.getItem('user'));
        if (districts?.district?.toUpperCase() == 'ALL') {
            setUserDistrict(allDistricts);
        } else {
            setUserDistrict([districts?.district]);
        }
        setSelectedDistrict(userDistrict[0]);
        getApplicationStatisticsData_DistrictWise(selectedDistrict);
        getAllDCS_DistrictWise(selectedDistrict);
        console.log("userDistrict===", userDistrict);
        console.log("selectedDistrict===", selectedDistrict);
    }

    const getApplicationStatisticsData_DistrictWise = (selectedDistrict) => {
        setLoading(true)
        api
            .getApplicationStatisticsData_DistrictWise(selectedDistrict)
            .then((res) => {
                console.log("getApplicationStatisticsData_DistrictWise==", res);
                // setData(res.data.data);
                if(res.status===200){
                    graph1_DataFormatter(res.data.data);
                }
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log("err: ", err);
            });
    };

    const getAllDCS_DistrictWise = (selectedDistrict) => {
        api
            .getAllDCS_DistrictWise(selectedDistrict)
            .then((res) => {
                console.log("res :", res);
                if(res.status===200){
                    initDCSDropdown(res.data.data);
                }
                // setData(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log("err: ", err);
            });
    }

    const initDCSDropdown = (data) =>{
        let dcsOptions=[];
        if(data.length>0){
            data.map(item=>{
                dcsOptions.push({id:item.id, name:item.name, registration: item.registration_no});
            });
        }
        setDcsList(dcsOptions);
    }

    useEffect(()=>{
        getApplicationStatisticsData_DistrictWise(selectedDistrict);
    },[selectedDistrict])
    const onChangeDistrict = (district) =>{
        // getApplicationStatisticsData_DistrictWise(district);
        setSelectedDistrict(district);
        getAllDCS_DistrictWise(district); 
    }

    const graph1_DataFormatter = (data) =>{
        setIsGraph1(false);
        let total = 0;
        let approved = 0;
        let rejected = 0;
        let draft = 0;
        let incomplete = 0;
        if(data.length>0){
            data.map(item=>{
                total+=1;
                if(item.status=='Approve'){
                    approved+=1;
                }
                if(item.status=='Reject'){
                    rejected+=1;
                }
                if(item.status=='Draft'){
                    draft+=1;
                }
                if(item.status=='Incompleted'){
                    incomplete+=1;
                }
            });
        }
        setGraph1_Data([
            {
                title: 'Total Applications',
                count: total
            },
            {
                title: 'Approved',
                count: approved
            },
            {
                title: 'Rejected',
                count: rejected
            },
            {
                title: 'Draft',
                count: draft
            },
            {
                title: 'Incomplete',
                count: incomplete
            }
        ]);
        console.log("graph1_Data====",graph1_Data);
        setChartData({
            labels: graph1_Data.map((data) => data.title),
            datasets: [
                {
                    label: "District Wise Statistics",
                    data: graph1_Data.map((data) => data.count),
                    backgroundColor: [
                        "rgba(75,192,192,1)",
                        "#50AF95",
                        "#Ff0000",
                        "#f3ba2f",
                        "#2a71d0"
                    ],
                    borderColor: "gray",
                    borderWidth: 1
                }
            ]
        });
        setIsGraph1(true);
        // setLoading(false);
    }

    return (
        <section className="dash m-0 p-0">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 p-1">
                        <CountStatus />
                    </div>
                </div>

                <div className="row">
                    <Loader open={loading} />
                    <div className="col-md-6 p-1">
                        <Paper>
                            <div class="counter bg-light">
                                <div class="panel panel-default">
                                    <div class="panel-heading p-2">
                                        <h5>Subsidy Applications Summary
                                            <span style={{ fontSize: '14px' }}>
                                                <div style={{ float: 'right' }}>
                                                    District Wise &nbsp;&nbsp;
                                                    <select onChange={(e) => onChangeDistrict(e.target.value)}>
                                                        {userDistrict &&
                                                            userDistrict.map((district) => (
                                                                <option value={district}>{district}</option>
                                                            ))}

                                                    </select>
                                                </div>
                                            </span>

                                        </h5>
                                    </div>
                                    <div class="panel-body">
                                        {isGraph1 && 
                                            <BarChart chartData={chartData} />
                                        } 
                                    </div>

                                </div>
                                {/* <PieChart chartData={chartData} /> */}

                            </div>
                        </Paper>
                    </div>
                    <div className="col-md-6 p-1">
                        <Paper>
                            <div class="counter bg-light">
                                <div class="panel panel-default">
                                    <div class="panel-heading p-2">
                                        <h5>Subsidy Applications Summary
                                            <span style={{ fontSize: '14px' }}>
                                                <div style={{ float: 'right' }}>
                                                    DCS Wise &nbsp;&nbsp;
                                                    <select>
                                                    {dcsList &&
                                                            dcsList.map((dcs) => (
                                                                <option value={dcs.registration}>{dcs.name}</option>
                                                            ))}
                                                    </select>
                                                </div>
                                            </span>

                                        </h5>
                                    </div>
                                    <div class="panel-body">
                                        <BarChart chartData={chartData2} />
                                    </div>

                                </div>
                                {/* <PieChart chartData={chartData} /> */}

                            </div>
                        </Paper>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 p-1">
                        <DashboardTable />
                    </div>
                </div>

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