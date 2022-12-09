import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import * as React from 'react'
import { ApiClient } from '../../../apiclient/ApiClient';
import { SurveyQuestionType, ALL_QUESTION_TYPE_VALUES, SurveyQuestionTextFromNumber } from '../../../enums/SurveyQuestionType';
import { SurveySummary } from '../../../apiclient/models/survey/SurveySummary';
import { SelectMultipleItems } from '../../common/SelectMultipleItems';

interface SurveySelectionTableProps {
    editSurvey: (survey: SurveySummary) => void;
}

export function SurveySelectionTable(props: SurveySelectionTableProps): JSX.Element {
    const [state, setState] = React.useState<[SurveySummary[], number[]]>([null, ALL_QUESTION_TYPE_VALUES]);
    React.useEffect(() => {
        ApiClient.getClient().getSurveySummaries().then(
            (value: SurveySummary[]) => {
                setState([value, state[1]]);
            }
        )
    }, []);
    const applicableValues: { [key: string]: string } = {};
    for (const value of ALL_QUESTION_TYPE_VALUES) {
        applicableValues[value.toString()] = SurveyQuestionTextFromNumber(value);
    }
    const changeSelectedQuestionTypes = (newTypes: number[] | string[]) => {
        if (!newTypes || newTypes.length == 0) {
            setState([state[0], []]);
        }
        if (typeof newTypes[0] !== 'string') {
            setState([state[0], newTypes as number[]]);
        } else {
            setState([state[0], (newTypes as string[]).map(value => parseInt(value))]);
        }
    }
    return (
        <>
            <SelectMultipleItems
                isNumber={true}
                title="Select Question Types"
                items={applicableValues}
                currentlySelected={state[1]}
                changeSelection={changeSelectedQuestionTypes}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Question text</TableCell>
                        <TableCell align="center">Question type</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                </TableBody>
            </Table>
        </>
    )
}
