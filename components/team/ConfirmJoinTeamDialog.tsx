import React, {ChangeEvent, FormEvent, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
} from '@material-ui/core';
import {useJoinTeamMutation} from '../../__generated__/GraphQLTypes';
import {useSnackbar} from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useRouter} from 'next/router';

interface ConfirmJoinTeamDialogProps {
    open: boolean;
    handleClose: () => void;
    teamSelected: { id: string; name: string };
    publicTeam: boolean;
}

const ConfirmJoinTeamDialog = ({open, handleClose, teamSelected, publicTeam}: ConfirmJoinTeamDialogProps) => {
    const [joinTeam] = useJoinTeamMutation();
    const {enqueueSnackbar} = useSnackbar();
    const [password, setPassword] = React.useState(null);
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const {push} = useRouter();

    const handleSendTeamRequest = async (event: FormEvent ) => {
        event.preventDefault();
        setIsSendingRequest(true);
        const {data, errors} = await joinTeam({
            variables: {
                data: {
                    id: parseInt(teamSelected.id),
                    password,
                },
            },
        });
        if (errors) {
            console.log(errors);
            return enqueueSnackbar('Hubo un error con la peticion', {
                variant: 'error',
            });
        }
        enqueueSnackbar(data.joinTeam.msg, {
            variant: data.joinTeam.ok ? 'success' : 'error',
        });
        if (data.joinTeam.ok) {
            await push('/teams/' + teamSelected.id);
            handleClose();
        } else {
            setPassword('');
        }
        setIsSendingRequest(false);
    };

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setPassword(evt.target.value);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <form autoComplete='off' onSubmit={handleSendTeamRequest}>
                <DialogTitle id='alert-dialog-title'>Unirse a {teamSelected.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        {publicTeam ? (
                            <Typography variant='body2'>Unirse al equipo publico {teamSelected.name}</Typography>
                        ) : (
                            <>
                                <Typography variant='body1' style={{marginBottom: 18}}>
                                    {teamSelected.name} es un equipo privado, debes ingresar contraseña.
                                </Typography>
                                <TextField
                                    autoComplete='off'
                                    id='outlined-basic'
                                    type='password'
                                    value={password}
                                    onChange={handleInputChange}
                                    label='Ingrese contraseña'
                                    variant='outlined'
                                />
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button
                        onClick={handleSendTeamRequest}
                        color='primary'
                        autoFocus
                        startIcon={isSendingRequest ? <CircularProgress size={24}/> : null}
                    >
                        Unirse
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ConfirmJoinTeamDialog;
