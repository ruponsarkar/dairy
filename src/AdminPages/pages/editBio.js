import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditBio(props) {



    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };



    return (
        <div>
            <Button variant="contained" size='small' onClick={props.handleClickOpen}>
                Want to Edit Bio
            </Button>
            <Dialog open={props.open}
                onClose={props.handleClose}
                fullWidth={true}
                maxWidth='md'
            >
                <DialogTitle>Bio</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit Your Bio
                    </DialogContentText>
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={props.bio.bio}
                    /> */}

                    <textarea className='form-control' rows={6} onChange={props.handleBio}>
                        {props.bio && props.bio.bio}
                    </textarea>


                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={props.updateBio}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}