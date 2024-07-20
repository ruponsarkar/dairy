import React, { useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';




// import Lottie from "lottie-react";
// import Error from './error.json';
// import Success from './success.json';



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

import AddProductForm from "../form/AddProductForm";

import AddImageForm from "../form/addImageForm";

import CircularProgress from '@mui/material/CircularProgress';

import { useDropzone } from 'react-dropzone';

const steps = [
    {
        label: 'Enter your information',

    },
    {
        label: 'Upload single/multiple images',

    },
    {
        label: 'Submit Your Data',

    }
];

const AddProduct = () => {

    const [loader, setLoader] = useState(false);
    const [formData, setFormdata] = useState({
        title: '',
        brand: '',
        category: '',
        price: '',
        discountPercentage: '',
        stock: '',
        rating: '',

    });

    const [cover, setCover] = useState();
    const [details, setDetails] = useState('');
    const [coverpreview, setCoverpreview] = useState();
    const [fileList, setFileList] = useState([]);


    const handleCoverImg = (e)=>{
        setCover(e.target.files[0]);
        setCoverpreview(URL.createObjectURL(e.target.files[0]))
    }

    const handleDetails = (e)=>{
        setDetails(e);
        console.log(e);
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFileList(
                acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            )
        }
    })

    const handleInput = (e) => {
        setFormdata({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const handleUploadClick = () => {
        if (fileList.length === 0) {
            console.log("no image selected");

            toast.error('Need to Upload at-least one Image', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        setLoader(true);

        const api = process.env.REACT_APP_MAIN_API;

        const url = api + "/addProducts";

        console.log("===>", fileList.length);

        const imgdata = new FormData();

        for (let i = 0; i < fileList.length; i++) {
            imgdata.append(`img_${i}`, fileList[i])

        }
        imgdata.append('lenght', fileList.length);

        imgdata.append('title', formData.title)
        imgdata.append('brand', formData.brand)
        imgdata.append('category', formData.category)
        imgdata.append('price', formData.price)
        imgdata.append('discountPercentage', formData.discountPercentage)
        imgdata.append('stock', formData.stock)
        imgdata.append('rating', formData.rating)
        imgdata.append('details', details)
        imgdata.append('cover', cover)

        axios.post(url, imgdata)
            .then((res) => {
                setLoader(false);
                console.log("==>", res.data);
                console.log(res.status);
                if (res.status === 200) {

                    toast.success('Successfully Added', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
                else {
                    toast.error('Something went wrong !', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });


                }
            })
            .catch((err) => {
                setLoader(false);
                console.log(err.response);
                toast.error('Opps Something went wrong !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })

    };



    const thirdPage = () => {
        return (
            <div className="text-center">
                <h3 className="my-5">Preview of all data</h3>

                <table className="table table-striped table-bordered table-hover">
                    <thead style={{ 'textAlign': 'left' }}>
                        <tr className="light-bg">
                            <th scope="col">Event Name</th>
                            <td>{formData.event}</td>
                        </tr>
                        <tr>
                            <th scope="col">Date</th>
                            <td>{formData.from}</td>
                        </tr>
                        <tr className="light-bg">
                            <th scope="col">Time</th>
                            <td>{formData.time}</td>
                        </tr>
                        <tr>
                            <th scope="col">Location</th>
                            <td>{formData.location}</td>
                        </tr>
                        <tr className="light-bg">
                            <th scope="col">Description</th>
                            <td>{formData.description}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }




    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);

        if (activeStep === 2) {
            console.log("Last step");

            handleUploadClick();

        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };



    return (
        <Box sx={{ width: '100%' }}>
            <ToastContainer />
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label.label} {...stepProps}>
                            <StepLabel {...labelProps}>{label.label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        {/* All steps completed - you&apos;re finished */}


                        {loader &&
                            <div className="success">
                                <div className="text-center mt-3 pt-4">
                                    <CircularProgress disableShrink />
                                </div>
                                <div className="text-center">
                                    Please Wait ...
                                </div>
                            </div>
                        }





                    </Typography>

                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                        <div className="text-center">
                            <Box>
                                <div style={{ 'width': '300px', 'height': '300px' }}>
                                    {/* <Lottie animationData={Error} /> */}
                                    <h1>Error</h1>
                                </div>
                                <div class="alert alert-danger">
                                    <CancelIcon />
                                    <strong className="px-2">Oops! Something went wrong.</strong>
                                    <p className="py-1"> <SentimentVeryDissatisfiedIcon /> &nbsp;Data Upload Failed</p>
                                </div>


                                <div style={{ 'width': '300px', 'height': '300px' }}>
                                    {/* <Lottie animationData={Success} /> */}
                                    <h1>Success</h1>
                                </div>

                                <div class="alert alert-success">
                                    <CheckCircleIcon />
                                    <strong className="px-2">Congratulations!</strong>
                                    <p className="py-1"> <MoodIcon /> &nbsp;Data Uploaded Successfully</p>
                                </div>
                            </Box>
                        </div>
                    </>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {/* {activeStep === 0 && firstPage()} */}
                    {activeStep === 0 && <AddProductForm data={handleInput} value={formData} handleCoverImg={handleCoverImg} details={details} handleDetails={handleDetails} coverpreview={coverpreview} />}
                    {activeStep === 1 && <AddImageForm datafile={fileList} getInput={getInputProps()} getRoot={getRootProps()} />}
                    {activeStep === 2 && thirdPage()}


                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button variant="outlined" onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Submit and Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

export default AddProduct;