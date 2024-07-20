import React, { useEffect, useState } from 'react'
import AddJournalForm from '../form/addJournalForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../API/api.js';

import Swal from 'sweetalert2';


const AddJournal = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        getPublisher();
        getCategory();

        if (props.id) {
            getJournalForUpdate();
        }
    }, []);



    const [publisher, setPublisher] = useState([]);
    const [sl, setSL] = useState([]);
    const [cat, setCat] = useState([]);
    const [load, setLoad] = useState(false);


    const [formData, setFormData] = useState({
        id: '',
        sl: '',
        title: '',
        category: '',
        published_on: '',
        link: '',
        author: '1',
        type: '',
        date: '',
    });
    const [details, setDetails] = useState();
    const [img, setImg] = useState();

    const [preview, setPreview] = useState();
    const [defaultPreview, setDefaultPreview] = useState('/assets/default_image.png');



    const getJournalForUpdate = () => {
        console.log("worked for update");
        api.getJournalWithId(props.id)
            .then((res) => {
                console.log(res.data.journal.image);
                setFormData(res.data.journal);
                setDetails(res.data.journal.description)

                setDefaultPreview(process.env.REACT_APP_BACKEND + 'assets/journal/' + res.data.journal.image)
            })
            .catch((err) => {
                console.log(err.response);
            })
    }


    const getPublisher = () => {
        setLoad(true);
        api.getPublisher()
            .then((res) => {
                setLoad(false)
                console.log(res);
                setPublisher(res.data.publisher)
                setSL(res.data.sl)
                setFormData({...formData, 'sl': res.data.sl});
            })
            .catch((err) => {
                // setLoad(false)
                console.log(err.response);
            })
    }

    const getCategory = () => {
        setLoad(true)
        api.getCategory()
            .then((res) => {
                setLoad(false)
                console.log(res);
                setCat(res.data.category)
            })
            .catch((err) => {
                // setLoad(false)
                console.log(err.response);
            })
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        if (e.target.value === "+addCat") {
            navigate('/admin/category')
        }
        if (e.target.value === "+addPub") {
            navigate('/admin/publisher')
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleImg = (e) => {
        setImg(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    const handleDetails = (e) => {
        console.log(e);
        setDetails(e);
    }

    const handleSubmit = () => {
        // console.log(formData);
        // return;
        setLoad(true);

        const api = process.env.REACT_APP_MAIN_API
        const url = api + "postJournal";

        const data = new FormData();

        data.append('id', formData.id)
        data.append('sl', formData.sl)
        data.append('title', formData.title)
        data.append('category', formData.category)
        data.append('publish_on', formData.published_on)
        data.append('link', formData.link)
        data.append('author', formData.author)
        data.append('description', details)
        data.append('type', formData.type)
        data.append('date', formData.date)
        data.append('img', img)

        axios.post(url, data)
            .then((res) => {
                setLoad(false);
                if (props.handleClose) {
                    props.handleClose()
                }
                console.log(res);
                if (res.data.status === 200) {
                    Swal.fire({
                        title: "Success",
                        text: res.data.message,
                        icon: 'success',
                    });
                }
                else {
                    if (props.handleClose) {
                        props.handleClose()
                    }
                    Swal.fire({
                        title: "Error",
                        text: "Something Went Wrong!",
                        icon: 'error',
                    });
                }
            })
            .catch((err) => {
                setLoad(false);
                console.log(err.response);
                Swal.fire({
                    title: "Error",
                    text: "Something Went Wrong!",
                    icon: 'error',
                });
            })
    }

    return (
        <>
            <AddJournalForm value={formData} handleChange={handleChange} details={details} handleDetails={handleDetails} handleSubmit={handleSubmit} handleImg={handleImg} publisher={publisher} cat={cat} load={load} preview={preview} defaultPreview={defaultPreview} />

        </>
    )
}

export default AddJournal;