import * as React from 'react'
import { ApiClient } from '../../../apiclient/ApiClient';
import { AccessCode } from '../../../apiclient/models/AccessCode';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { MessageArea, MessageAreaProps } from '../../common/MessageArea';
import { TeamDialog } from './TeamDialog';
import { UserSettingColumn } from './UserSettingColumn';


interface UserSettingMainViewProps {
    accessCodeListing: [AccessCode[], AccessCode[], AccessCode[]];
    triggerUpdatePlayers: () => void;
}

export const UserSettingMainView = (props: UserSettingMainViewProps): JSX.Element => {
    const [message, changeMessage] = React.useState<MessageAreaProps>(null);
    const [playerToSetTeam, setPlayerToSetTeam] = React.useState<AccessCode>(null);

    const deactivateUser = (accessCode: AccessCode) => {
        accessCode?.user?.id && ApiClient.getClient().deactivateUser(accessCode?.user?.id).then((success: boolean) => {
            if (success) {
                changeMessage({
                    text: "Successfully deactivated the user",
                    type: 'success',
                });
            }
            else {
                changeMessage({
                    text: "Could not deactivate the user",
                    type: 'error',
                });
            }
            setTimeout(() => { changeMessage(null) }, 10000);
        }
        );
    };
    const makeCaptain = (accessCode: AccessCode) => {
        accessCode?.user?.id && ApiClient.getClient().makeUserCaptain(accessCode?.user?.id).then((success: boolean) => {
            if (success) {
                changeMessage({
                    text: "Successfully made user a captain",
                    type: 'success',
                });
            }
            else {
                changeMessage({
                    text: "Could not make user a captain",
                    type: 'error',
                });
            }
            setTimeout(() => { changeMessage(null) }, 10000);
        }
        );
    };
    const setTeam = (accessCode: AccessCode) => {
        if (!accessCode?.user) {
            return;
        }
        setPlayerToSetTeam(accessCode);
    }

    return <>
        {message && <MessageArea {...message} />}
        <TeamDialog open={!!playerToSetTeam} handleClose={() => setPlayerToSetTeam(null)} player={playerToSetTeam?.user} triggerUpdatePlayers={props.triggerUpdatePlayers} />
        <AutoScaleMaterialRow>
            <UserSettingColumn
                key={1}
                codes={props.accessCodeListing[1]}
                team={1}
                leftAction={deactivateUser}
                titleLeftButton="Deactivate user"
                rightAction={makeCaptain}
                titleRightButton="Make captain"
            />
            <UserSettingColumn
                key={0}
                codes={props.accessCodeListing[0]}
                team={0}
                leftAction={deactivateUser}
                titleLeftButton="Deactivate user"
                rightAction={setTeam}
                titleRightButton="Set team"
            />
            <UserSettingColumn
                key={2}
                codes={props.accessCodeListing[2]}
                team={2}
                leftAction={deactivateUser}
                titleLeftButton="Deactivate user"
                rightAction={makeCaptain}
                titleRightButton="Make captain"
            />
        </AutoScaleMaterialRow>
    </>
}