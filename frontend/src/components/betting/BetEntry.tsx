import * as React from 'react'
import { AllLanguageOutput } from '../common/AllLanguageOutput';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../common/AutoScaleMaterialRow';
import { BetProps } from './BetProps';
import { PlacedBet } from '../../apiclient/models/PlacedBet';
import { SubmitButton } from '../common/QuestionSubmitButton';
import { ApiClient } from '../../apiclient/ApiClient';
import { Clear, Done, QuestionMark } from '@mui/icons-material';

interface BetEntryProps {
    value?: number;
    assignValue: -1 | 0 | 1;
}

export function BetEntry(props: BetEntryProps): JSX.Element {
    const icon = props.assignValue == 0 ? <QuestionMark/> : (props.assignValue == 1 ? <Done/> : <Clear/>);
    return (
        <AutoScaleMaterialRow>
            { props.value ? <>{icon}<AllLanguageOutput text={[props.value.toString()]} /></> : "?" }
        </AutoScaleMaterialRow>
    )
}