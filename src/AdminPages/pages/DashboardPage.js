import React, { useEffect, useState } from "react";

import RateReviewIcon from '@mui/icons-material/RateReview';
import PublishIcon from '@mui/icons-material/Publish';
import StyleIcon from '@mui/icons-material/Style';
import ContactsIcon from '@mui/icons-material/Contacts';
import Swal from "sweetalert2";
import api from "../../API/api";
import EditBio from "./editBio";


const DashboardPage = () => {


    const [headcolor, setHeadColour] = useState();
    const [titlecolor, setTitleColour] = useState();
    const [bio, setBio] = useState();
    const [count, setCount] = useState();

    // useEffect(() => {
    //     getHeadlineColor();
    //     countData();
    // }, []);


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getHeadlineColor = () => {
        api.getHeadlineColor().then((res) => {
            setHeadColour(res.data.headlineColor.headlineColor)
            setTitleColour(res.data.headlineColor.titleColor)
            setBio(res.data.bio)
            // console.log("dashboard", res);
        })
    }

    const handleBio = (e) => {
        setBio(e.target.value);

    }

    const updateBio = () => {
        console.log(bio);
        api.updateBio(bio).then((res) => {
            console.log(res);
            getHeadlineColor();
            handleClose();

            Swal.fire({
                title: "Success",
                text: 'Your Bio Updated',
                icon: 'success',
            });

        })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const countData = () => {
        api.countData().then((res) => {
            // console.log("cc", res.data.count);
            setCount(res.data.count);
        })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const changeColorHead = (e) => {
        setHeadColour(e.target.value)
    }
    const changeColorTitle = (e) => {
        setTitleColour(e.target.value)
    }

    const saveColor = () => {
        api.saveColor(headcolor, titlecolor)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    title: "Success",
                    text: res.data.message,
                    icon: 'success',
                });
            })
            .catch((err) => {
                console.log(err.response);
            })

    }





    return (
        <section className="dash m-0 p-0">
            <div className="container">
                <div className="row my-5 justify-content-center">
                    <div className="reports my-2">
                        <h3 className="p-3 text-center">Stats Reports</h3>
                        <div className="d-flex p-3" style={{ 'flexWrap': 'wrap' }}>
                            <div className="col-md-6">
                                <div className="event text-center m-2">
                                    <StyleIcon /><br />
                                    <h6 className="py-2"><strong>Total Journal</strong></h6>
                                    <p className="text-center">{count && count.tot_journal}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="blogs text-center m-2">
                                    <PublishIcon /><br />
                                    <h6 className="py-2"><strong>Total Publisher</strong></h6>
                                    <p className="text-center">{count && count.tot_pub}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="media text-center m-2">
                                    <RateReviewIcon /><br />
                                    <h6 className="py-2"><strong>Total Category</strong></h6>
                                    <p className="text-center">{count && count.tot_cat}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="paper text-center m-2">
                                    <ContactsIcon /><br />
                                    <h6 className="py-2"><strong>Total Contact Request</strong></h6>
                                    <p className="text-center">{count && count.tot_contact}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div>
                        <h3>Customize</h3>
                        <hr />
                    </div>


                    <div className="col-md-12">
                        <div className="my-3">
                            <h3> Bio</h3>
                            <div>{bio && bio.bio}</div>

                            <EditBio open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} bio={bio} handleBio={handleBio} updateBio={updateBio} />
                        </div>
                    </div>

                    <hr />


                    <div className="col-md-4">
                        <strong>Choose color For Head lines</strong>
                        <br />
                        <input type="color" id="favcolor" onChange={changeColorHead} name="favcolor" value={headcolor} />

                    </div>
                    <div className="col-md-4">
                        <strong>Choose color For Article Titles</strong>
                        <br />
                        <input type="color" id="favcolor" onChange={changeColorTitle} name="favcolor" value={titlecolor} />

                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-success btn-sm" style={{ height: '30px' }} onClick={saveColor}>Change Color</button>
                    </div>


                </div>
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