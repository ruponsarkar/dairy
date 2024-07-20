import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import CatTable from '../table/categoryTable';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Swal from 'sweetalert2';
import LinkTable from '../table/linkTable';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import 'swiper/css/autoplay';
import 'swiper/css';
import 'swiper/css/scrollbar';

import api from '../../API/api';

const Youtubelink = () => {

    const [open, setOpen] = React.useState(false);
    const [links, setLinks] = useState();

    const [formData, setFormData] = useState();

    useEffect(() => {
        getLink();
    }, []);

    const getLink = () => {
        api.getLink()
            .then((res) => {
                console.log(res);
                setLinks(res.data.links);

            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInput = (e) => {
        console.log(e.target.value);
        setFormData(e.target.value);
    }

    const handleSubmit = () => {

        if (formData === "") {
            setOpen(false);
            Swal.fire({
                title: "Error",
                text: "Link can't be empty !",
                icon: 'error',
            })
                .then(() => {
                    setOpen(true);
                })
            return;
        }

        console.log(formData);
        api.postLink(formData)
            .then((res) => {
                // getCategory();
                getLink();
                console.log(res);
                if (res.data.status === 200) {
                    setOpen(false);
                    Swal.fire({
                        title: "Success",
                        text: res.data.message,
                        icon: 'success',
                    })

                }
                else {
                    Swal.fire({
                        title: "error",
                        text: "Something went wrong !",
                        icon: 'error',
                    })
                }


            })
            .catch((err) => {
                console.log(err.response);
                Swal.fire({
                    title: "error",
                    text: "Something went wrong !",
                    icon: 'error',
                })
            })
    }

    return (
        <>
            <div className="container">
                <Card>
                    <div className="row">
                        <div className="col-6">
                            <div className='m-2'>
                                {/* <button onClick={handleClickOpen}>+ Add New Category</button> */}
                                <Button variant="contained" color='warning' onClick={handleClickOpen}>
                                    + Add New Link
                                </Button>


                                <Dialog open={open} fullWidth={true}
                                    maxWidth='md' onClose={handleClose}>
                                    {/* <DialogTitle>Category</DialogTitle> */}
                                    <DialogContent>
                                        <div className="row">
                                            <div className="col-md-7">

                                                <DialogContentText>
                                                    Add New Embeded Link
                                                </DialogContentText>

                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    label="Enter Embeded Link"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    onChange={handleInput}
                                                />
                                            </div>

                                            <div className="col-md-5">
                                                <div className="row">

                                                    <div> <u> Instruction </u></div>

                                                    <Swiper
                                                        spaceBetween={10}
                                                        loop={false}
                                                        autoplay={{
                                                            delay: 1500,
                                                            disableOnInteraction: false,
                                                        }}
                                                        speed={1500}
                                                        modules={[Autoplay, Pagination, Navigation, Scrollbar]}
                                                        scrollbar={{ draggable: true }}
                                                        className="testimonials-slider swiper"
                                                        data-aos="fade-up"
                                                        data-aos-delay="100"
                                                    >

                                                        <div className="swiper-wrapper">
                                                            <SwiperSlide>
                                                                <div className='mb-2'>
                                                                    <strong>Click on "Share"</strong>
                                                                    <img src="/assets/slide1.jpg" width="100%" alt="" />
                                                                </div>
                                                            </SwiperSlide>
                                                            <SwiperSlide>
                                                                <div className='mb-2'>
                                                                <strong>Click on "Embed"</strong>
                                                                    <img src="/assets/slide2.jpg" width="100%" alt="" />
                                                                </div>
                                                            </SwiperSlide>
                                                            <SwiperSlide>
                                                                <div className='mb-2'>
                                                                <strong>Copy the highlighed part only</strong>
                                                                    <img src="/assets/slide3.jpg" width="100%" alt="" />
                                                                </div>
                                                            </SwiperSlide>
                                                        </div>

                                                    </Swiper>

                                                </div>


                                            </div>



                                        </div>



                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={handleSubmit}>+ Add</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className='mt-2'>

                    <Card>
                        <div className="row">
                            <div className="col-12">
                                <div className='m-2 text-center'>
                                    <h4> Youtube Embeded Links</h4>
                                </div>


                                <LinkTable links={links} getLink={getLink}/>




                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </>
    )
}

export default Youtubelink;