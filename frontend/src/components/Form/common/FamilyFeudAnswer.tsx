import { TableCell, TableRow } from '@mui/material';
import * as React from 'react';
import { Answer } from '../../../apiclient/models/Answer';
import { getBackgroundCssClassForTeam } from '../../../enums/TeamColorsCss';
import { AllLanguageOutput } from '../../common/AllLanguageOutput';

interface FamilyFeudAnswerProps {
    answer: Answer;
}

export function FamilyFeudAnswer(props: FamilyFeudAnswerProps): JSX.Element {
    const backgroundColorClassname = getBackgroundCssClassForTeam(props.answer?.team);
    return (
        <TableRow className={backgroundColorClassname}>
            <TableCell align="center">
                <AllLanguageOutput text={props.answer?.is_shown ? props.answer?.answerdata?.text : ["   "]} />
            </TableCell>
            <TableCell align="center">
                {props.answer?.is_shown && props.answer?.answerdata?.points_value}
            </TableCell>
            <TableCell align="center">
                {props.answer?.is_shown && props.answer?.answerdata?.points_value}
            </TableCell>
        </TableRow>
    )
}