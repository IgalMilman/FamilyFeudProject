import * as React from 'react'
import { AllLanguageOutput } from '../common/AllLanguageOutput';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../common/AutoScaleMaterialRow';
import { BetProps } from './BetProps';
import { PlacedBet } from '../../apiclient/models/PlacedBet';
import { SubmitButton } from '../common/QuestionSubmitButton';
import SubmitButtonType from '../../enums/SubmitButtonType';
import { ApiClient } from '../../apiclient/ApiClient';
import { BetEntry } from './BetEntry';

export function BetOpportunityHost(props: BetProps): JSX.Element {
    if (!props.betOpportunity) {
        return <></>;
    }
    let firstBet: PlacedBet = props.betOpportunity.bets?.find((bet) => bet.team == 1 && !!bet.id);
    let secondBet: PlacedBet = props.betOpportunity.bets?.find((bet) => bet.team == 2 && !!bet.id);
    let firstBetPlaced: boolean = !!firstBet?.id;
    let secondBetPlaced: boolean = !!secondBet?.id;
    return (
        <AutoScaleMaterialRow>
            <AutoScaleMaterialColumn>
                <AutoScaleMaterialRow>
                    {firstBetPlaced ? <BetEntry value={firstBet.size} assignValue={firstBet.assigned} /> : "-"}
                </AutoScaleMaterialRow>
                <AutoScaleMaterialRow>
                    <SubmitButton onClick={() => { ApiClient.getClient().assignBet(firstBet.id as string, -1) }} type={SubmitButtonType.SubmitAnswer} disabled={!firstBetPlaced} text="Wrong" />
                    <SubmitButton onClick={() => { ApiClient.getClient().assignBet(firstBet.id as string, 0) }} type={SubmitButtonType.SubmitAnswer} disabled={!firstBetPlaced} text="Neutral" />
                    <SubmitButton onClick={() => { ApiClient.getClient().assignBet(firstBet.id as string, 1) }} type={SubmitButtonType.SubmitAnswer} disabled={!firstBetPlaced} text="Correct" />
                </AutoScaleMaterialRow>
                <AutoScaleMaterialRow>
                    <SubmitButton onClick={() => { ApiClient.getClient().revealBet(firstBet.id as string) }} type={SubmitButtonType.SubmitAnswer} disabled={!firstBetPlaced || firstBet.is_shown as boolean} text="Reveal" />
                </AutoScaleMaterialRow>
            </AutoScaleMaterialColumn>
            <AutoScaleMaterialColumn>
                {props.questionId ? <SubmitButton onClick={() => { ApiClient.getClient().assignBetOpportunity(props.betOpportunity.id as string, props.questionId as string) }} type={SubmitButtonType.SubmitAnswer} disabled={props.questionId == props.betOpportunity.question} text="Assign to question" /> : <></>}
            </AutoScaleMaterialColumn>
            <AutoScaleMaterialColumn>
                <AutoScaleMaterialRow>
                    {secondBetPlaced ? <AllLanguageOutput text={[secondBet.size.toString()]} /> : "-"}
                </AutoScaleMaterialRow>
                <AutoScaleMaterialRow>
                    <SubmitButton onClick={() => { ApiClient.getClient().assignBet(secondBet.id as string, -1) }} type={SubmitButtonType.SubmitAnswer} disabled={!secondBetPlaced} text="Wrong" />
                    <SubmitButton onClick={() => { ApiClient.getClient().assignBet(secondBet.id as string, 0) }} type={SubmitButtonType.SubmitAnswer} disabled={!secondBetPlaced} text="Neutral" />
                    <SubmitButton onClick={() => { ApiClient.getClient().assignBet(secondBet.id as string, 1) }} type={SubmitButtonType.SubmitAnswer} disabled={!secondBetPlaced} text="Correct" />
                </AutoScaleMaterialRow>
                <AutoScaleMaterialRow>
                    <SubmitButton onClick={() => { ApiClient.getClient().revealBet(secondBet.id as string) }} type={SubmitButtonType.SubmitAnswer} disabled={!secondBetPlaced || secondBet.is_shown as boolean} text="Reveal" />
                </AutoScaleMaterialRow>
            </AutoScaleMaterialColumn>
        </AutoScaleMaterialRow>
    )
}