import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import * as React from 'react'
import { ApiClient } from '../../apiclient/ApiClient';
import { GameAction } from '../../apiclient/models/GameAction';
import { QuestionData } from '../../apiclient/models/QuestionData';
import AppMode from '../../enums/AppModes';
import { ALL_QUESTION_TYPE_VALUES, QuestionTextFromNumber } from '../../enums/QuestionType';
import { MainGameContentProps } from '../common/MainGameContentProps';
import { SelectMultipleItems } from '../common/SelectMultipleItems';
import { GameQuestionSelectionOneRow } from './GameQuestionSelectionOneRow';

export function GameQuestionSelection(props: MainGameContentProps): JSX.Element {
    const [state, setState] = React.useState<[QuestionData[], number[]]>([null, ALL_QUESTION_TYPE_VALUES]);
    React.useEffect(() => {
        if (props.game?.id) {
            ApiClient.getClient().getQuestionsForGameList(props.game?.id).then(
                (value: QuestionData[]) => {
                    setState([value, state[1]]);
                }
            )
        }
    }, [props.game?.id]);
    const setQuestion = (question: QuestionData) => {
        const action = new GameAction();
        action.action = 'next_question';
        action.questionid = question?.id;
        ApiClient.getClient().performActionOnGame(action).then((value => {
            if (value && props.changeAppMode) {
                props.changeAppMode(AppMode.QuestionMode);
            }
        }));
    }
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
    return (<>
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
                    <TableCell align="center">State</TableCell>
                    <TableCell align="center">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    state[0]?.filter((value) => state[1].includes(value.qtype)).map((question, index) => <GameQuestionSelectionOneRow
                        key={index}
                        question={question}
                        questionSelectionAction={setQuestion}
                    />)
                }
            </TableBody>
        </Table>
    </>
    )
}
