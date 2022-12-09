import * as React from 'react'
import { TableHead, TableCell, TableRow } from '@mui/material'
import { SurveyWithAnswers } from '../../../apiclient/models/survey/SurveyWithAnswers';

interface SurveyTableHeaderProps {
    survey: SurveyWithAnswers;
}

export const SurveyTableHeader = (props: SurveyTableHeaderProps): JSX.Element => {

    return <TableHead>
        <TableRow>
            <TableCell>
                Responder
            </TableCell>
            {
                props.survey?.questions?.map(
                    (question, index) => <TableCell  key={question.id || index}>
                        {question.text.join('\n')}
                    </TableCell>
                )
            }
        </TableRow>
    </TableHead>
}