import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
props: TransitionProps & {
children: React.ReactElement<any, any>;
},
ref: React.Ref<unknown>,
) {
return <Slide direction="up" ref={ref} {...props} />;
});

interface Props{
    title:string;
    description:string;
    handleClose:(agreedStatus:boolean)=>void;
}

export default function ConfirmAlert({title, description, handleClose}:Props) {

return (
<div>
    <Dialog
    open={true}
    TransitionComponent={Transition}
    keepMounted
    onClose={()=>handleClose(false)}
    aria-describedby="alert-dialog-slide-description"
    >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
        {description}
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={()=>handleClose(false)}>아니오</Button>
        <Button onClick={()=>handleClose(true)}>네</Button>
    </DialogActions>
    </Dialog>
</div>
);
}