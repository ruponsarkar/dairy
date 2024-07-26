import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Modal({maxWidth, modaldata, open, handleClose, title}) {


  return (
    <React.Fragment>

      <Dialog
        fullWidth={true}
        maxWidth={maxWidth ? maxWidth : 'sm'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{title && title}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText> */}


          {modaldata}
          


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
