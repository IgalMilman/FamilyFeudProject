import { Typography } from '@mui/material';
import * as React from 'react'
import { Team } from '../../apiclient/models/Team';
import { getBackgroundCssClassForTeam } from '../../enums/TeamColorsCss';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../common/AutoScaleMaterialRow';

interface TeamSummaryProps {
    team: Team
}

export function TeamSummaryHeader(props: TeamSummaryProps): JSX.Element {
    return (
        <AutoScaleMaterialColumn>
            <AutoScaleMaterialRow>
                <AutoScaleMaterialColumn className={getBackgroundCssClassForTeam(props.team?.number)}>
                    <AutoScaleMaterialRow>
                        {
                            <Typography variant="subtitle1" color="primary.dark">
                                {props.team?.name?.toString()}
                            </Typography>
                        }
                    </AutoScaleMaterialRow>
                    <AutoScaleMaterialRow>
                        {
                            <Typography variant="subtitle1" color="primary.dark">
                                {props.team?.points?.toString()}
                            </Typography>
                        }
                    </AutoScaleMaterialRow>
                </AutoScaleMaterialColumn>
            </AutoScaleMaterialRow>
        </AutoScaleMaterialColumn>
    );
}