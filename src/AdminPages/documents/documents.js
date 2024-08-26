import React, { useState, useRef, useEffect } from 'react'
import { Paper, Button } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import PublicIcon from '@mui/icons-material/Public';
import Modal from '../../ui-component/modal';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import api from '../../API/api';
import BasicMenu from '../../ui-component/menu';
import Checkbox from '@mui/material/Checkbox';



const Documents = () => {

    const location = useLocation();
    const navigation = useNavigate();
    console.log("Location : ", location.hash.substring(100, 1));


    const [param, setParam] = useState(0);
    const fileInput = useRef(null);
    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setOpen(true)
    }

    const [folderName, setFolderName] = useState();

    useEffect(() => {
        setParam(location.hash.substring(100, 1))
        getFillDocuments(location.hash.substring(100, 1));
    }, [location.hash, param])

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
            createdBy: JSON.parse(sessionStorage.getItem("user")).id,
            permissions: permissions
        }

        api.createFolder(reqData).then((res) => {
            console.log("==>>", res);
            getFillDocuments(param)
            setOpen(false)

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
        Data.append('ref_id', param)
        Data.append('fileName', fileName)
        Data.append('originalName', originalName)
        Data.append('fileType', fileType)
        Data.append('createdBy', JSON.parse(sessionStorage.getItem("user")).id)
        Data.append('permissions', JSON.stringify(permissions))

        Data.append('file', file)

        api.uploadDocuments(Data).then((res) => {
            console.log("==>>", res);
            getFillDocuments(param);
            setOpen(false)

        });

    }

    const updateFileDocument = (data) => {
        console.log("data id : ", data);
        let reqData = {
            // type: data.type,
            name: folderName,
            ref_id: param,
            // createdBy: JSON.parse(sessionStorage.getItem("user")).id,
            permissions: permissions
        }



    }

    // useEffect((()=>{
    //     updateFileDocument(permissions);
    // }),[])




    const openFile = () => {
        fileInput.current.click();
    };

    const handleFolderNavigation = (id) => {
        getFillDocuments(id);
        setParam(id);
        navigation("#" + id);
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

    const handleViewFile = (file) => {
        console.log("file", file);
        // let api = 'http://localhost:8800/'
        let api = 'https://milksubsidydairyassam.com:8800/'
        window.open(api + file, '_blank');
    }

    // const [permissions, setPermissions] = useState({
    //     onlyme: true,
    //     dlc: false,
    //     slsc: false,
    //     finance: false
    // })
    const [permissions, setPermissions] = useState({
        onlyme: false,
        dlc: true,
        slsc: true,
        finance: true
    })

    const handleCheck = (type) => {
        return;
        let editPermission = { ...permissions };

        if (type === 'dlc') {
            editPermission.onlyme = false;
            editPermission.dlc = !permissions.dlc;
        }
        if (type === 'slsc') {
            editPermission.onlyme = false;
            editPermission.slsc = !permissions.slsc;
        }
        if (type === 'finance') {
            editPermission.onlyme = false;
            editPermission.finance = !permissions.finance;
        }
        if (type === 'onlyme') {
            editPermission.onlyme = true;
            editPermission.dlc = false;
            editPermission.slsc = false;
            editPermission.finance = false
        }

        setPermissions(editPermission);
        // console.log("permissionss ==>> : ", editPermission);
        console.log("permissions ==>> : ", permissions);
        updatePermisions(permissions);

    }

    const updatePermisions = (permissions) => {
        let data = {

        }
        updateFileDocument()

    }



    const menuItems = [
        // {
        //     name: 'Delete',
        // },
        {
            name: (
                <div>
                    <div className="text-secondary">
                        <small>Permissions</small>
                    </div>
                    <div className='d-flex gap-3'>
                        <div>
                            <small>Only me:<Checkbox checked={permissions.onlyme} onClick={(e) => handleCheck('onlyme')} /></small>
                        </div>
                        <div>
                            <small>DLC:<Checkbox checked={permissions.dlc} onClick={(e) => handleCheck('dlc')} /></small>
                        </div>
                        <div>
                            <small>SLSC:<Checkbox checked={permissions.slsc} onClick={(e) => handleCheck('slsc')} /></small>
                        </div>
                        <div>
                            <small>FINANCE:<Checkbox checked={permissions.finance} onClick={(e) => handleCheck('finance')} /></small>
                        </div>
                    </div>
                </div>
            ),
        },
    ]



    return (
        <div>

            <Modal open={open} maxWidth='xs' modaldata={createFoler()} handleClose={() => setOpen(false)} onSubmit={handleCreateFolder} disabledBtn={loading} />

            <div className='py-1'>
                <Paper>
                    <div className='d-flex align-items-center'>

                        <div className="p-3">
                            Documents
                        </div>

                        <div>
                            <Button variant='outlined' size='small' onClick={() => openModal()}>Create Folder</Button> &nbsp;
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
                                <div style={{ padding: '10px' }} className='pb-0 d-flex justify-content-between'>
                                    <div className='col-md-10 d-flex justify-content-between'>
                                        <div className='col-md-8'>
                                            Name
                                        </div>
                                        <div className='col-md-2 text-right'>
                                            Added by
                                        </div>
                                        <div className='col-md-2 text-right'>
                                            Created date
                                        </div>

                                    </div>
                                    <div>
                                        Permissions
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className='m-0 p-0 text-secondary' />

                        <div>
                            <div className='p-2'>

                                {data && data.map((file) => (
                                    <>
                                        {file.type === 'folder' &&
                                            <div className='folder d-flex justify-content-between' >
                                                <div className='col-md-10 d-flex justify-content-between align-items-center' role='button' onClick={() => handleFolderNavigation(file.id)}>
                                                    <div className='col-md-6'>
                                                        <FolderIcon /> {file.name}
                                                    </div>
                                                    <div className='col-md-2 text-secondary'>
                                                        <small>
                                                            {/* DCS */}
                                                        </small>
                                                    </div>
                                                    <div className='col-md-2 text-secondary'>
                                                        <small>
                                                            {/* 10 Aug, 24 */}
                                                        </small>
                                                    </div>

                                                </div>

                                                <div className='permissions' role='button'
                                                // onClick={() => console.log("kk")}
                                                >
                                                    <small>
                                                        {/* <PublicIcon /> */}
                                                        <BasicMenu menuItems={menuItems} />
                                                    </small>
                                                </div>
                                            </div>
                                        }

                                        {file.type === 'file' &&
                                            <div className='file d-flex justify-content-between' >
                                                <div className='col-md-10 d-flex justify-content-between align-items-center' role='button' onClick={() => handleViewFile(file.fileName)}>
                                                    <div className='col-md-8'>
                                                        <DescriptionIcon />{file.originalName}
                                                    </div>
                                                    <div className='text-secondary col-md-2 text-right'>
                                                        <small>
                                                           {file.role}
                                                        </small>
                                                    </div>
                                                    <div className='text-secondary col-md-2 text-right'>
                                                        <small>
                                                            {/* {file.created_at} */}

                                                            {new Date(file.created_at).getDate()
                                                                + ", " +
                                                                new Date(file.created_at).toLocaleString("default", { month: "long", })
                                                                + "-" +
                                                                new Date(file.created_at).getFullYear()}
                                                        </small>
                                                    </div>
                                                </div>

                                                <div className='permissions' role='button' onClick={() => console.log("kk")}>
                                                    <small>
                                                        {/* <PublicIcon /> */}
                                                        <BasicMenu menuItems={menuItems} />
                                                    </small>
                                                </div>
                                            </div>
                                        }
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