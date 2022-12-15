import * as React from 'react'
import { ApiClient } from '../../apiclient/ApiClient';
import { APIResponse } from '../../apiclient/models/APIResponse';
import { SurveyAnswerObject } from '../../apiclient/models/createrequests/SurveyAnswerObject';
import { PlayerListing, PlayerByTeamAllocation } from '../../apiclient/models/Player';
import { Survey } from '../../apiclient/models/survey/Survey'
import { SurveyAnswer } from '../../apiclient/models/survey/SurveyAnswer';
import SubmitButtonType from '../../enums/SubmitButtonType';
import { AllLanguageOutput } from '../common/AllLanguageOutput';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { MessageArea, MessageAreaProps } from '../common/MessageArea';
import { SubmitButton } from '../common/QuestionSubmitButton';
import { SurveyQuestionDisplay } from './participantsComponents/SurveyQuestionDisplay';

interface SurveyFormParticipantProps {
    surveyId: string;
}

export const SurveyFormParticipant = (props: SurveyFormParticipantProps): JSX.Element => {
    const [surveyState, setSurveyState] = React.useState<[Survey, SurveyAnswerObject]>([null, null]);
    const [playerAllocation, setPlayerAllocation] = React.useState<PlayerByTeamAllocation>(null);
    const [message, setMessage] = React.useState<MessageAreaProps>(null)
    const setAnswer = (questionId: string, value: string | number) => {
        surveyState[1].setAnswer(questionId, value);
    }
    React.useEffect(
        () => {
            ApiClient.getClient().getSurveyForGame(props.surveyId).then(
                (value: Survey): void => {
                    setSurveyState([value, SurveyAnswerObject.forSurvey(value)]);
                    ApiClient.getClient().getPlayerListing().then(
                        (value: PlayerListing): void => {
                            if (!value) {
                                return;
                            }
                            const plAllocation = new PlayerByTeamAllocation();
                            plAllocation.self = value.self;
                            Object.keys(value.teams).forEach(
                                (team_num) => {
                                    const tnum = parseInt(team_num)
                                    value.teams[tnum].forEach(
                                        (player) => {
                                            if (player.id == plAllocation.self?.id) {
                                                return;
                                            }
                                            if (plAllocation.self?.team) {
                                                if (plAllocation.self?.team == tnum) {
                                                    plAllocation.my.push(player);
                                                }
                                                else {
                                                    plAllocation.opposing.push(player);
                                                }
                                            }
                                            plAllocation.all.push(player);
                                        }
                                    )
                                }
                            );
                            setPlayerAllocation(plAllocation);
                        }
                    )
                }
            )
        },
        [props.surveyId]
    )
    return <AutoScaleMaterialColumn spacing={2}>
        {surveyState[0] && <><AllLanguageOutput text={surveyState[0].title} />
            <MessageArea {...message} />
            {
                surveyState[0]?.questions?.map(
                    (value, index) => <SurveyQuestionDisplay
                        key={index}
                        question={value}
                        answer={surveyState[1].getAnswer(value.id) || ''}
                        setAnswer={setAnswer}
                        playerAllocation={playerAllocation}
                    />
                )
            }
            <SubmitButton type={SubmitButtonType.SubmitAnswer} disabled={false} onClick={function (): void {
                ApiClient.getClient().upsertSurveyAnswerForGame(props.surveyId, surveyState[1]).then((value: APIResponse<SurveyAnswer>) => {
                    if (!value) {
                        setMessage({ type: 'error', text: 'There was error with the request' });
                        return;
                    }
                    if (value.status == 200) {
                        setMessage({ type: 'success', text: 'The survey was submitted successfully.' });
                        setTimeout(() => { setMessage(undefined) }, 10000);
                    }
                    else {
                        setMessage({ type: 'error', text: value.error });
                    }
                })
            }} /></>}
        {!surveyState[0] && "Loading the survey, please wait..."}
    </AutoScaleMaterialColumn>
}