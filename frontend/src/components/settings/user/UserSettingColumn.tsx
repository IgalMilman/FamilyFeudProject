import * as React from 'react'
import { ApiClient } from '../../../apiclient/ApiClient';
import { AccessCode } from '../../../apiclient/models/AccessCode';
import { getBorderCssClassForTeam } from '../../../enums/TeamColorsCss';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import StyledButton from '../../styled/Button';

interface UserSettingColumnProps {
    codes: AccessCode[];
    team: 0 | 1 | 2;
    leftAction: (accessCode: AccessCode)=>void;
    rightAction: (accessCode: AccessCode)=>void;
    titleLeftButton: string;
    titleRightButton: string;
}

export const UserSettingColumn = (props: UserSettingColumnProps): JSX.Element => {
    if (!props.codes?.length) {
        return <AutoScaleMaterialColumn></AutoScaleMaterialColumn>
    }
    return <AutoScaleMaterialColumn className={getBorderCssClassForTeam(props.team == 0? undefined : props.team)}>
        {
            props.codes.map((code, index) => {
                return <AutoScaleMaterialRow key={index}>
                    <AutoScaleMaterialColumn><StyledButton type="button" onClick={() => { props.leftAction(code); }}>{props.titleLeftButton}</StyledButton></AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn>{code.user?.first_name}<br/>Code: {code.access_code}</AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn><StyledButton type="button" onClick={() => { props.rightAction(code); }}>{props.titleRightButton}</StyledButton></AutoScaleMaterialColumn>
                </AutoScaleMaterialRow>
            })
        }
    </AutoScaleMaterialColumn>
}