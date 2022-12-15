import { MenuItem, Select } from '@mui/material';
import * as React from 'react'
import { ApiClient } from '../../apiclient/ApiClient';
import { AccessCode } from '../../apiclient/models/AccessCode';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../common/AutoScaleMaterialRow';
import { MainGameContentProps } from '../common/MainGameContentProps';
import StyledButton from '../styled/Button';
import { AvailableAccessCodesView } from './user/AvailableAccessCodesView';
import { UserSettingMainView } from './user/UserSettingMainView';

enum ScreenState {
    ActiveUsers,
    InactiveUsers,
    AllUsersLogin
}

export function GameUserSetupScreen(props: MainGameContentProps): JSX.Element {
    const [accessCodeList, setAccessCodeList] = React.useState<[AccessCode[], AccessCode[], AccessCode[], AccessCode[], AccessCode[]]>([[], [], [], [], []]);
    const [screenState, setScreenState] = React.useState<ScreenState>(ScreenState.ActiveUsers);
    const queryPlayerListing = () => {
        ApiClient.getClient().getAllAccessCodesAndUsers().then(
            (value) => {
                const listing: [AccessCode[], AccessCode[], AccessCode[], AccessCode[], AccessCode[]] = [[], [], [], [], []];
                value.forEach((code) => {
                    if (!code.user?.active) {
                        listing[3].push(code);
                    }
                    switch (code.user.team) {
                        case 1:
                            listing[1].push(code);
                            break;
                        case 2:
                            listing[2].push(code);
                            break;
                        default:
                            listing[0].push(code);
                            break;
                    }
                    listing[4].push(code);
                })
                setAccessCodeList(listing);
            }
        )
    };
    React.useEffect(() => { queryPlayerListing() }, []);
    const onScreenStateChange = (event: { target: { value: string } }): void => {
        const t: ScreenState = parseInt(event.target.value) as ScreenState;
        setScreenState(t);
    }
    return <AutoScaleMaterialColumn spacing={2}>
        <AutoScaleMaterialRow spacing={3}>
            <StyledButton type='button' onClick={() => { queryPlayerListing() }}>Update data</StyledButton>
            <Select
                value={screenState.toString()}
                name='state'
                id='state'
                label='Change state'
                onChange={onScreenStateChange}>
                <MenuItem value={ScreenState.ActiveUsers}>Active users view</MenuItem>
                <MenuItem value={ScreenState.InactiveUsers}>Inactive users view</MenuItem>
                <MenuItem value={ScreenState.AllUsersLogin}>All users logins view</MenuItem>
            </Select>
        </AutoScaleMaterialRow>
        {(screenState == ScreenState.ActiveUsers) && <UserSettingMainView accessCodeListing={[accessCodeList[0], accessCodeList[1], accessCodeList[2]]} triggerUpdatePlayers={queryPlayerListing} />}
        {(screenState == ScreenState.InactiveUsers) && <AvailableAccessCodesView accessCodeListing={accessCodeList[3]} triggerUpdatePlayers={queryPlayerListing} />}
        {(screenState == ScreenState.AllUsersLogin) && <AvailableAccessCodesView accessCodeListing={accessCodeList[4]} triggerUpdatePlayers={queryPlayerListing} />}
    </AutoScaleMaterialColumn>
}