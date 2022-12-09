import { MenuItem, Select } from '@mui/material';
import * as React from 'react';
import { PlayerListing } from '../../../apiclient/models/Player';
import { SurveyQuestionParameters } from '../../../apiclient/models/survey/SurveyQuestion';

interface SurveyQuestionPlayerChoiceProps {
    label: string;
    id: string;
    questionParameters: SurveyQuestionParameters;
    answer: string;
    setAnswer: (event: { target: { value: string; }; }) => void;
    playerListing: PlayerListing;
}

export const SurveyQuestionPlayerChoice = (props: SurveyQuestionPlayerChoiceProps): JSX.Element => {
    return <Select
        value={props.answer}
        name={props.id}
        id={props.id}
        onChange={props.setAnswer}>
        {
            props.questionParameters?.include_self && <MenuItem
                key={props.playerListing?.self?.id.toString()}
                id={props.playerListing?.self?.id.toString()}
                value={props.playerListing?.self?.id}>
                {props.playerListing?.self?.name}
            </MenuItem>
        }
        {
            props.questionParameters?.player_filter in ['all', 'my'] && props.playerListing?.my?.map((value) => <MenuItem
                key={value.id.toString()}
                id={value.id.toString()}
                value={value.id}>
                {value.name}
            </MenuItem>
            )
        }
        {
            props.questionParameters?.player_filter in ['all', 'opposing'] && props.playerListing?.opposing?.map((value) => <MenuItem
                key={value.id.toString()}
                id={value.id.toString()}
                value={value.id}>
                {value.name}
            </MenuItem>
            )
        }
    </Select>
}