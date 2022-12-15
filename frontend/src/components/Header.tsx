import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Menu } from './menu/Menu';
import { MenuData } from './menu/MenuItem';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import AppMode from '../enums/AppModes';
import { BaseAppProps } from './common/AppProps';

interface HeaderProps extends BaseAppProps {
    title?: string;
    titleProvider?: () => string;
    menuItems?: MenuData[];
    beforeTitleElement?: ReactJSXElement;
    afterTitleElement?: ReactJSXElement;
    changeModeAction: (mode: AppMode) => void;
}

export default function Header(props: HeaderProps): JSX.Element {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Menu items={props.menuItems} {...props} />
                    {props.beforeTitleElement}
                    <Typography textAlign='center' variant="h3" component="div" sx={{ flexGrow: 1 }}>
                        {props.title ? props.title : props.titleProvider ? props.titleProvider() : ""}
                    </Typography>
                    {props.afterTitleElement}
                </Toolbar>
            </AppBar>
        </Box>
    );
} 