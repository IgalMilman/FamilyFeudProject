import * as React from 'react'
import { PlayerListing } from '../../../apiclient/models/Player';
import { SurveyQuestion } from '../../../apiclient/models/survey/SurveyQuestion';
import { SurveyQuestionType } from '../../../enums/SurveyQuestionType';
import { AllLanguageOutput } from '../../common/AllLanguageOutput';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { SurveyQuestionMultipleLinesEntry } from './SurveyQuestionMultipleLinesEntry';
import { SurveyQuestionNumberChoice } from './SurveyQuestionNumberChoice';
import { SurveyQuestionNumberEntry } from './SurveyQuestionNumberEntry';
import { SurveyQuestionOneLineEntry } from './SurveyQuestionOneLineEntry';
import { SurveyQuestionPlayerChoice } from './SurveyQuestionPlayerChoice';

interface SurveyQuestionDisplayProps {
    question: SurveyQuestion;
    answer: string | number;
    setAnswer: (questionId: string, value: string | number) => void;
    playerListing: PlayerListing;
}

export const SurveyQuestionDisplay = (props: SurveyQuestionDisplayProps): JSX.Element => {
    const setAnswerString = (event: { target: { value: string; }; }) => {
        props.setAnswer(props.question.id, event.target.value);
    }
    const setAnswerNumber = (event: { target: { value: string; }; }) => {
        const value: number = parseInt(event.target.value)
        props.setAnswer(props.question.id, value);
    }
    let element: JSX.Element = null;
    switch (props.question.qtype) {
        case SurveyQuestionType.OneLineTextEntry:
            element = <SurveyQuestionOneLineEntry
                label={props.question?.text?.join('\n')}
                id={props.question.id}
                questionParameters={props.question?.parameters}
                answer={props.answer as string}
                setAnswer={setAnswerString}
            />
            break
        case SurveyQuestionType.MultilineTextEntry:
            element = <SurveyQuestionMultipleLinesEntry
                label={props.question?.text?.join('\n')}
                id={props.question.id}
                questionParameters={props.question?.parameters}
                answer={props.answer as string}
                setAnswer={setAnswerString}
            />
            break
        case SurveyQuestionType.PlayerChoice:
            element = <SurveyQuestionPlayerChoice
                label={props.question?.text?.join('\n')}
                id={props.question.id}
                questionParameters={props.question?.parameters}
                answer={props.answer as string}
                setAnswer={setAnswerString}
                playerListing={props.playerListing}
            />
            break
        case SurveyQuestionType.NumberChoice:
            element = <SurveyQuestionNumberChoice
                label={props.question?.text?.join('\n')}
                id={props.question.id}
                questionParameters={props.question?.parameters}
                answer={props.answer as number}
                setAnswer={setAnswerNumber}
            />
            break
        case SurveyQuestionType.NumberEntry:
            element = <SurveyQuestionNumberEntry
                label={props.question?.text?.join('\n')}
                id={props.question.id}
                questionParameters={props.question?.parameters}
                answer={props.answer as number}
                setAnswer={setAnswerNumber}
            />
            break
    }
    if (element) {
        return <AutoScaleMaterialRow>
            <AllLanguageOutput text={props.question?.text} />
            {element}
        </AutoScaleMaterialRow>
    }
    return <></>
}