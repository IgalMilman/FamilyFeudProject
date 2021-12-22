import { Alert } from "@mui/material";
import * as React from "react";
import { AutoScaleMaterialRow } from "./AutoScaleMaterialRow";

export interface MessageAreaProps {
    type?: 'error' | 'success' | 'info';
    text?: string;
}

export const MessageArea = (props: MessageAreaProps): JSX.Element => {
    if (!props.type || !props.text) {
        return <></>
    }
    return (
        <AutoScaleMaterialRow>
            <Alert severity={props.type} >{props.text}</Alert>
        </AutoScaleMaterialRow>
    );
};
