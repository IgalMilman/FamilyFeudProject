import * as React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MaterialMenu from '@mui/material/Menu';
import { MenuItem, MenuData } from './MenuItem'
import AppMode from '../../enums/AppModes';
import { BaseAppProps } from '../common/AppProps';
import { ApiClient } from '../../apiclient/ApiClient';
import { redirect } from '../../apiclient/CommonMethods';

export interface MenuProps extends BaseAppProps {
    items: MenuData[];
    currentMode: AppMode;
    changeModeAction: (mode: AppMode) => void;
}

export function Menu(props: MenuProps): JSX.Element {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: { currentTarget: any; }) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleItemClick = (mode: AppMode) => {
        props.changeModeAction(mode);
        handleClose();
    }
    return (<>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
        >
            <MenuIcon />
        </IconButton>
        <MaterialMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
        >
            {props.items.map(
                (menuData, index) => (
                    <MenuItem key={index.toString()} data={menuData} selected={menuData.mode === props.currentMode}
                        onClick={handleItemClick} />
                )
            )}
            <MenuItem selected={false} onClick={() => {
                redirect('/logout');            
            }} data={{ name: 'Logout', mode: AppMode.Login }} />
        </MaterialMenu>
    </>)
}