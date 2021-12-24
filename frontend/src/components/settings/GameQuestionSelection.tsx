import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import * as React from 'react'
import { ApiClient } from '../../apiclient/ApiClient';
import { GameAction } from '../../apiclient/models/GameAction';
import { QuestionData } from '../../apiclient/models/QuestionData';
import AppMode from '../../enums/AppModes';
import { MainGameContentProps } from '../common/MainGameContentProps';
import { GameQuestionSelectionOneRow } from './GameQuestionSelectionOneRow';

export function GameQuestionSelection(props: MainGameContentProps): JSX.Element {
    const [questionList, changeQuestionList] = React.useState<QuestionData[]>(null);
    React.useEffect(() => {
        if (props.game?.id) {
            ApiClient.getClient().getQuestionsList(props.game?.id).then(
                (value: QuestionData[]) => {
                    changeQuestionList(value);
                }
            )
        }
    }, [props.game?.id]);
    const setQuestion = (question: QuestionData) => {
        const action = new GameAction();
        action.action = 'next_question';
        action.questionid = question?.id;
        ApiClient.getClient().performActionOnGame(props.game?.id, action).then((value => {
            if (value && props.changeAppMode) {
                props.changeAppMode(AppMode.QuestionMode);
            }
        }));
    }
    return (
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
                    questionList?.map((question, index) => <GameQuestionSelectionOneRow
                        key={index}
                        question={question}
                        questionSelectionAction={setQuestion}
                    />)
                }
            </TableBody>
        </Table>
    )
}
