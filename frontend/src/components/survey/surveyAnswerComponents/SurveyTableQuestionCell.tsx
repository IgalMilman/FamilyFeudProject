import * as React from 'react'
import { TableCell } from '@mui/material'
import { Player } from '../../../apiclient/models/Player';
import { SurveyQuestionType } from '../../../enums/SurveyQuestionType';

interface SurveyTableQuestionCellProps {
    value: string | number;
    questionType: SurveyQuestionType;
    playerList: { [playerId: number]: Player };
}

const GetText = (props: SurveyTableQuestionCellProps): string => {
    switch (props.questionType) {
        case (SurveyQuestionType.NumberChoice):
        case (SurveyQuestionType.NumberEntry):
            return props.value?.toString();
        case (SurveyQuestionType.PlayerChoice):
            if ((props.value as any) instanceof String)
                return props.playerList[parseInt(props.value as string)]?.first_name;
            else 
                return props.playerList[props.value as number]?.first_name;
    }
    return props.value?.toString();
}

export const SurveyTableQuestionCell = (props: SurveyTableQuestionCellProps): JSX.Element => {
    return <TableCell>
        {GetText(props)}
    </TableCell>
}