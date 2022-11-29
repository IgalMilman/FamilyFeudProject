import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import * as React from 'react'
import { ApiClient } from '../../../apiclient/ApiClient';
import { QuestionSummary } from '../../../apiclient/models/QuestionSummary';
import { QuestionTextFromNumber, ALL_QUESTION_TYPE_VALUES } from '../../../enums/QuestionType';
import { SelectMultipleItems } from '../../common/SelectMultipleItems';
import { QuestionSelectionOneRow } from './QuestionSelectionOneRow';

interface QuestionSelectionTableProps {
    editQuestion: (question: QuestionSummary) => void;
}

export function QuestionSelectionTable(props: QuestionSelectionTableProps): JSX.Element {
    const [state, setState] = React.useState<[QuestionSummary[], number[]]>([null, ALL_QUESTION_TYPE_VALUES]);
    React.useEffect(() => {
        ApiClient.getClient().getQuestionsList([]).then(
            (value: QuestionSummary[]) => {
                setState([value, state[1]]);
            }
        )
    }, []);
    const applicableValues: { [key: string]: string } = {};
    for (const value of ALL_QUESTION_TYPE_VALUES) {
        applicableValues[value.toString()] = QuestionTextFromNumber(value);
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
                    {
                        state[0]?.filter(value => state[1].includes(value.qtype)).map(question => <QuestionSelectionOneRow
                            key={question.id}
                            question={question}
                            editQuestion={props.editQuestion}
                        />)
                    }
                </TableBody>
            </Table>
        </>
    )
}
