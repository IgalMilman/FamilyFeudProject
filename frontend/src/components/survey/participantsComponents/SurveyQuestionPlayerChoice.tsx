import { MenuItem, Select } from '@mui/material';
import * as React from 'react';
import { Player, PlayerByTeamAllocation } from '../../../apiclient/models/Player';
import { SurveyQuestionParameters } from '../../../apiclient/models/survey/SurveyQuestion';

interface SurveyQuestionPlayerChoiceProps {
    label: string;
    id: string;
    questionParameters: SurveyQuestionParameters;
    answer: string;
    setAnswer: (value: string) => void;
    playerAllocation: PlayerByTeamAllocation;
}

export const SurveyQuestionPlayerChoice = (props: SurveyQuestionPlayerChoiceProps): JSX.Element => {
    const playerList: Player[] = [];
    if (props.questionParameters?.include_self && props.playerAllocation?.self) {
        playerList.push(props.playerAllocation.self);
    }
    switch (props.questionParameters?.player_filter) {
        case 'my':
            if (props.playerAllocation?.my) {
                playerList.push(...props.playerAllocation.my);
            }
            break;
        case 'opposing':
            if (props.playerAllocation?.opposing) {
                playerList.push(...props.playerAllocation.opposing);
            }
            break;
        default:
            if (props.playerAllocation?.all) {
                playerList.push(...props.playerAllocation.all);
            }
            break;
    }
    const [answer, setAnswer] = React.useState<string>(props.answer ?? "");
    const onChange = (event: { target: { value: string; }; }) => {
        setAnswer(event.target.value);
        props.setAnswer(event.target.value);
    }
    return <Select
        value={answer}
        name={props.id}
        id={props.id}
        fullWidth
        onChange={onChange}>
        {
            playerList.map((value: Player) => { return <MenuItem
                key={value.id.toString()}
                id={value.toString()}
                value={value.id}>
                {value.first_name}
            </MenuItem> })
        }
    </Select>
}