import * as React from 'react';
import { Dialog, DialogTitle, List, ListItem } from "@mui/material";
import { Player } from '../../../apiclient/models/Player';
import { ApiClient } from '../../../apiclient/ApiClient';

interface TeamDialogProps {
    player?: Player;
    handleClose: () => void;
    triggerUpdatePlayers: () => void;
    open: boolean;
}

export const TeamDialog = (props: TeamDialogProps): JSX.Element => {
    const itemClick = (team: number) => {
        ApiClient.getClient().assignUserToTeam(props.player?.id, team).then((success) => {
            props.triggerUpdatePlayers();
            props.handleClose();
        });
    }
    return <Dialog onClose={props.handleClose} open={props.open}>
        <DialogTitle>Set backup account</DialogTitle>
        <List sx={{ pt: 0 }}>
            <ListItem onClick={() => itemClick(1)}>
                First team
            </ListItem>
            <ListItem onClick={() => itemClick(2)}>
                Second team
            </ListItem>
        </List>
    </Dialog>
}