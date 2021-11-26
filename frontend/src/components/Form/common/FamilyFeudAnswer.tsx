import * as React from 'react';
import { Answer } from '../../../apiclient/models/Answer';
import { getBackgroundCssClassForTeam } from '../../../enums/TeamColorsCss';
import { AllLanguageOutput } from '../../common/AllLanguageOutput';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';

interface FamilyFeudAnswerProps {
    answer: Answer;
}

export function FamilyFeudAnswer(props: FamilyFeudAnswerProps): JSX.Element {
    const backgroundColorClassname = getBackgroundCssClassForTeam(props.answer?.team);
    return (
        <AutoScaleMaterialRow>
            <AutoScaleMaterialColumn xs={8} sm={4} className={backgroundColorClassname}>
                <AutoScaleMaterialRow>
                    <AutoScaleMaterialColumn xs={8}>
                        <AllLanguageOutput text={props.answer?.is_shown ? props.answer?.answerdata?.text : ["?"]} />
                    </AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn xs={2}>
                        {props.answer?.is_shown ? props.answer?.answerdata?.points_value : "?"}
                    </AutoScaleMaterialColumn>
                    <AutoScaleMaterialColumn xs={2}>
                        {props.answer?.is_shown ? props.answer?.answerdata?.points_value : "?"}
                    </AutoScaleMaterialColumn>
                </AutoScaleMaterialRow>
            </AutoScaleMaterialColumn>
        </AutoScaleMaterialRow>
    )
}