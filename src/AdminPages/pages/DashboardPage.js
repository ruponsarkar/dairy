import React from "react";
import CountStatus from "../../components/home/countStatus";
const DashboardPage = () => {


    return (
        
        <section className="dash m-0 p-0">
            <div className="container">

                {/* <div className="row text-center">
	                <div className="col-md-3 p-1">
	                    <div className="counter">
                            <i className="fa fa-file fa-2x"></i>
                            <h2 className="timer count-title count-number">100</h2>
                            <p className="count-text ">Total Applied</p>
                        </div>
	                </div>
                    <div className="col-md-3 p-1">
                        <div className="counter">
                            <i className="fa fa-check fa-2x"></i>
                            <h2 className="timer count-title count-number">460</h2>
                            <p className="count-text ">Approved</p>
                        </div>
                    </div>
                    <div className="col-md-3 p-1">
                        <div className="counter">
                            <i className="fa fa-inr fa-2x"></i>
                            <h2 className="timer count-title count-number">900</h2>
                            <p className="count-text ">Ammount Paid</p>
                        </div>
                    </div>
                    <div className="col-md-3 p-1">
                        <div className="counter">
                            <i className="fa fa-refresh fa-2x"></i>
                            <h2 className="timer count-title count-number">760</h2>
                            <p className="count-text ">Under Verification</p>
                        </div>
                    </div>
                </div> */}
                <CountStatus />


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