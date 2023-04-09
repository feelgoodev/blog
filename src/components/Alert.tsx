import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

interface Props{
    text:string;
}

export function ErrorAlert({text}:Props) {
    return (
    <Stack sx={{ minWidth: '1020px' }} spacing={2} className="fixed top-10 opacity-70">
        <Alert severity="error">
        <AlertTitle>에러</AlertTitle>
        <p>{text}</p>
        </Alert>
    </Stack>
    );
}

export function WarningAlert({text}:Props) {
    return (
    <Stack sx={{ minWidth: '1020px' }} spacing={2} className="fixed top-10 opacity-70">
        <Alert severity="warning">
        <AlertTitle>경고</AlertTitle>
        <p>{text}</p>
        </Alert>
    </Stack>
    );
}

export function SuccessAlert({text}:Props) {
    return (
    <Stack sx={{ minWidth: '1020px' }} spacing={2} className="fixed top-10 opacity-70">
        <Alert severity="success">
        <AlertTitle>성공</AlertTitle>
        <p>{text}</p>
        </Alert>
    </Stack>
    );
}