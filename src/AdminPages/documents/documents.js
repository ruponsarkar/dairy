import React, { useState, useRef, useEffect } from 'react'
import { Paper, Button } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import PublicIcon from '@mui/icons-material/Public';
import Modal from '../../ui-component/modal';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import api from '../../API/api';




const Documents = () => {

    const location = useLocation();
    const navigation = useNavigate();
    console.log("Location : ", location.hash);

    const [param, setParam] = useState(location.hash);
    const fileInput = useRef(null);
    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setOpen(true)
    }

    const [folderName, setFolderName] = useState();

    useEffect(()=>{
        getFillDocuments(param);
    },[param, location.hash])

    const getFillDocuments = (ref_id) => {
        setLoading(true)
        api.getFillDocuments(ref_id).then((res) => {
            console.log("res :", res);
            setData(res.data.data);
            setLoading(false)
        })
        .catch((err) => {
                setLoading(false)
                console.log("err ", err);
            })
    }


    const handleCreateFolder = () => {
        let reqData = {
            type: 'folder',
            name: folderName,
            ref_id: param,
            createdBy: JSON.parse(sessionStorage.getItem("user")).id
        }

        api.createFolder(reqData).then((res) => {
            console.log("==>>", res);
            getFillDocuments(param)

        });
    }

    const handleFileChange = (e) => {
        // console.log(e.target.files[0]);

        let file = e.target.files[0];
        let originalName = e.target.files[0].name;
        let fileName = Date.now() + "_" + originalName;
        let fileType = file.name.split(".")[1];


        console.log("name :", fileName);
        console.log("originalName :", originalName);
        console.log("fileType :", fileType);


        const Data = new FormData();
        Data.append('name', originalName)
        Data.append('type', 'file')
        Data.append('ref_id', 0)
        Data.append('fileName', fileName)
        Data.append('originalName', originalName)
        Data.append('fileType', fileType)
        Data.append('createdBy', JSON.parse(sessionStorage.getItem("user")).id)

        Data.append('file', file)

        api.uploadDocuments(Data).then((res) => {
            console.log("==>>", res);
        });

    }


    const openFile = () => {
        fileInput.current.click();
    };

    const handleFolderNavigation=(id)=>{
        getFillDocuments(id);
        setParam(id);
        navigation("#"+id);
    }



    const createFoler = () => {
        return (
            <div>
                <div className='p-3'>
                    <input type="text"
                        onChange={(e) => setFolderName(e.target.value)}
                        placeholder='Folder name'
                        autoFocus
                        className='form-control'
                        name="" id="" />
                </div>
            </div>
        )
    }



    return (
        <div>

            <Modal open={open} maxWidth='xs' modaldata={createFoler()} handleClose={() => setOpen(false)} onSubmit={handleCreateFolder} disabledBtn={loading}/>

            <div className='py-1'>
                <Paper>
                    <div className='d-flex align-items-center'>

                        <div className="p-3">
                            Documents
                        </div>
                        <button onClick={getFillDocuments}>getFillDocuments</button>

                        <div>
                            <Button variant='outlined' size='small' onClick={() => openModal()}>Create Folder</Button>
                            <Button variant='outlined' size='small' onClick={() => openFile()}>+Add File</Button>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e)}
                                ref={fileInput}
                                style={{ display: "none" }}
                            />
                        </div>
                    </div>
                </Paper>
            </div>
            <div className='py-1 '>
                <Paper>
                    <div className='documents'>



                        <div className='text-secondary'>

                            <div className="p-2 ">
                                <div style={{ padding: '10px' }} className='pb-0'>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            Name
                                        </div>
                                        <div>
                                            Added by
                                        </div>
                                        <div>
                                            Created
                                        </div>
                                        <div>
                                            Permissions
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className='m-0 p-0 text-secondary' />

                        <div>
                            <div className='p-2'>

                                {data && data.map((file) => (
                                    <>
                                        <div className='folder' role='button' onClick={()=>handleFolderNavigation(file.id)}>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <FolderIcon /> {file.name}
                                                </div>
                                                <div className='text-secondary'>
                                                    <small>
                                                        DCS
                                                    </small>
                                                </div>
                                                <div className='text-secondary'>
                                                    <small>

                                                        10 Aug, 24
                                                    </small>
                                                </div>
                                                <div>
                                                    <small>
                                                        <PublicIcon />
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}





                                {/* <div className='folder'>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <FolderIcon /> My Folder2
                                        </div>
                                        <div className='text-secondary'>
                                            <small>
                                                DCS
                                            </small>
                                        </div>
                                        <div className='text-secondary'>
                                            <small>

                                                10 Aug, 24
                                            </small>
                                        </div>
                                        <div>
                                            <small>
                                                <PublicIcon />
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className='folder'>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <FolderIcon /> My File1
                                        </div>
                                        <div className='text-secondary'>
                                            <small>
                                                DCS
                                            </small>
                                        </div>
                                        <div className='text-secondary'>
                                            <small>

                                                10 Aug, 24
                                            </small>
                                        </div>
                                        <div>
                                            <small>
                                                <PublicIcon />
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className='folder'>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <FolderIcon /> My File
                                        </div>
                                        <div className='text-secondary'>
                                            <small>
                                                DCS
                                            </small>
                                        </div>
                                        <div className='text-secondary'>
                                            <small>

                                                10 Aug, 24
                                            </small>
                                        </div>
                                        <div>
                                            <small>
                                                <PublicIcon />
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className='file'>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <DescriptionIcon /> My File.png
                                        </div>
                                        <div className='text-secondary'>
                                            <small>
                                                DCS
                                            </small>
                                        </div>
                                        <div className='text-secondary'>
                                            <small>

                                                10 Aug, 24
                                            </small>
                                        </div>
                                        <div>
                                            <small>
                                                <PublicIcon />
                                            </small>
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                        </div>

                    </div>
                </Paper>
            </div>

        </div>
    )
}

export default Documents;