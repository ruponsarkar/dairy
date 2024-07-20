import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";

import JoditEditor from 'jodit-react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Paper } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import { Button } from "@mui/material";

const AddJournalForm = (props) => {


    const editor = useRef(null);

    const config = {
        uploader: {
            insertImageAsBase64URI: true
        },
        height: 420,
        triggerChangeEvent: true,
        readonly: false,
    }

    const Jodit = () => {
        return useMemo(() => (
            <JoditEditor
                ref={editor}
                config={config}
                value={props.details}
                onChange={props.handleDetails}
            />
        ), [props.value])
    }


    return (
        <>
            <Paper elevation={3}>
                {props.load &&
                    <LinearProgress />
                }
                <div className="text-center">
                    <h3>Add Journal Details</h3>
                </div>

            </Paper>
            <Paper elevation={5}>
                <ToastContainer />
                <section id="eventForm" className="eventForm m-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 p-4">
                                <div className="php-email-form">

                                    <div className="row">
                                        <div className="col-md-9 form-group mt-2">
                                            <label>Headline Title</label><br />
                                            <input type="text" className="form-control" name="title" value={props.value.title} onChange={props.handleChange} id="name" />
                                        </div>

                                        <div className="col-md-3 form-group mt-2">
                                            <label>Category</label> <br />
                                            <select className="form-control" name="category" onChange={props.handleChange}>
                                                <option>--select--</option>
                                                {props.cat.map((el) => (
                                                    <>
                                                        <option selected={props.value.category == el.id ? 'selected' : ''} value={el.id}>{el.cat_name}</option>
                                                    </>
                                                ))}
                                                <option value="+addCat"> + Add More Category</option>

                                            </select>
                                        </div>
                                    </div>


                                    <div className="row">

                                        <div className="col-md-4 form-group mt-2">
                                            <label>Published On</label> <br />
                                            <select className="form-control" name="published_on" onChange={props.handleChange}>
                                                <option>--select--</option>
                                                {
                                                    props.publisher.map((el) => (
                                                        <>
                                                            <option selected={props.value.published_on == el.id ? 'selected' : ''} value={el.id}>{el.publishers_name}</option>
                                                        </>
                                                    ))
                                                }
                                                <option value="+addPub">+ Add More Publisher</option>
                                            </select>
                                        </div>


                                        <div className="col-md-4 form-group mt-2">
                                            <label>Article Type</label> <br />
                                            <select name="type" onChange={props.handleChange} value={props.value.type} className="form-control" id="">
                                                <option value="">--select--</option>
                                                <option value="full">Full Article</option>
                                                <option value="short">Short Article</option>
                                            </select>
                                        </div>

                                        

                                        
                                        <div className="col-md-4 form-group mt-2">
                                            <label>Published Date</label> <br />
                                            <input type="date" className="form-control" name="date" value={props.value.date} onChange={props.handleChange} id="name" />
                                        </div>

                                        <div className="col-md-2 form-group mt-2">
                                            <label>Serial Number</label> <br />
                                            <input type="number" className="form-control" name="sl" value={props.value.sl} onChange={props.handleChange} id="name" />
                                        </div>


                                        <div className="col-md-10 form-group mt-2">
                                            <label>Publishing Link</label> <br />
                                            <input type="text" className="form-control" name="link" value={props.value.link} onChange={props.handleChange} id="name" />
                                        </div>



                                    </div>

                                    <div className="col-md-12 form-group mt-2">
                                        <label>Cover Image</label> <br />
                                        <input type="file" className="form-control" name="cover" id="imgInp" onChange={props.handleImg} />
                                    </div>
                                    {
                                        // props.preview &&

                                        <div className="col-md-12 form-group mt-2" >
                                            <label>Preview</label> <br />
                                            <div className="card" style={{ height: "180px", alignItems: "center" }}>
                                                <img id="blah" src={props.preview ? props.preview : props.defaultPreview} alt="Cover Image Preview" style={{ height: "180px", width: "fit-content" }} />

                                            </div>

                                        </div>
                                    }

                                    <div className="form-group mt-4">
                                        <label>Enter Content</label><br />
                                        {Jodit()}
                                    </div>

                                    <div className="mt-4 text-center">
                                        <Button variant="contained" disabled={props.load ? 'disabled' : ''} onClick={props.handleSubmit}>Save Journal</Button>
                                    </div>





                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {props.load &&
                    <LinearProgress />
                }
            </Paper>
        </>
    )
}

export default AddJournalForm;