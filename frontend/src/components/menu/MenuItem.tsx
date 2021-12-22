import * as React from 'react'
import AppMode from '../../enums/AppModes';
import StyledMaterialMenuItem from '../styled/MaterialMenuItem';

interface MenuItemProps {
    data: MenuData;
    selected?: boolean;
    onClick: (mode:AppMode) => void;
}

export interface MenuData {
    icon?: any;
    name?: string,
    mode?: AppMode,
    additionalClickAction?: ()=> void;
};

export function MenuItem(props: MenuItemProps): JSX.Element {
    const onClick = ()=>{
        props.data?.mode && props.onClick(props.data.mode);
        if (props.data?.additionalClickAction) {
            props.data.additionalClickAction();
        }
    }
    return (
        <StyledMaterialMenuItem selected={props.selected} onClick={onClick} >
            {props.data?.icon}
            {props.data?.name}
        </StyledMaterialMenuItem>
    )
}