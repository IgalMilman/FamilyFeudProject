import * as React from 'react'
import { ApiClient } from '../../apiclient/ApiClient';
import { QuestionObject } from '../../apiclient/models/createrequests/QuetionObject';
import { QuestionData } from '../../apiclient/models/QuestionData';
import { QuestionSummary } from '../../apiclient/models/QuestionSummary';
import { QuestionSelectionTable } from './UpsertQuestion/QuestionSelectionTable';
import { UpdateQuestionForm } from './UpsertQuestion/UpdateQuestionForm';

enum BrowseQuestionScreenState {
    Table, Form
}

class ScreenState {
    constructor(state: BrowseQuestionScreenState = BrowseQuestionScreenState.Table, question: QuestionData = null) {
        this.state = state;
        this.question = question;
    }
    state: BrowseQuestionScreenState;
    question: QuestionData;
}

export function BrowseQuestionScreen(): JSX.Element {
    const [state, setState] = React.useState<ScreenState>(new ScreenState());
    const editQuestion = (question: QuestionSummary) => {
        ApiClient.getClient().getQuestion(question.id).then((value: QuestionData) => {
            setState(new ScreenState(BrowseQuestionScreenState.Form, value));
        })
    }
    let screen: JSX.Element;
    switch (state.state) {
        case BrowseQuestionScreenState.Table:
            screen = <QuestionSelectionTable editQuestion={editQuestion} />
            break;
        case BrowseQuestionScreenState.Form:
            screen = <UpdateQuestionForm
                question={QuestionObject.fromQuestionData(state.question)}
                updateData={value => setState(new ScreenState(state.state, value))}
                backToTable={() => setState(new ScreenState())}
            />
            break;
    }
    return <>{screen}</>
}