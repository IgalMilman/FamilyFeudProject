import * as React from 'react'
import { AllLanguageOutput } from '../common/AllLanguageOutput';
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { AutoScaleMaterialRow } from '../common/AutoScaleMaterialRow';
import { BetProps } from './BetProps';
import { PlacedBet } from '../../apiclient/models/PlacedBet';
import { BetEntry } from './BetEntry';

export function BetOpportunityVP(props: BetProps): JSX.Element {
    if (!props.betOpportunity) {
        return <></>;
    }
    let firstBet: PlacedBet = props.betOpportunity.bets?.find((bet) => bet.team == 1 && !!bet.id);
    let secondBet: PlacedBet = props.betOpportunity.bets?.find((bet) => bet.team == 2 && !!bet.id);
    let firstBetSize: number  = ((!firstBet?.id) || ((!firstBet?.size) && (firstBet?.size === 0))) ? undefined : firstBet?.size;
    let secondBetSize: number  = ((!secondBet?.id) || ((!secondBet?.size) && (secondBet?.size === 0))) ? undefined : secondBet?.size;
    return (
        <>
            <AutoScaleMaterialRow>
                <AutoScaleMaterialColumn>
                    <AutoScaleMaterialRow>
                        <BetEntry assignValue={firstBet?.assigned ?? 0} value={firstBetSize} />
                    </AutoScaleMaterialRow>
                </AutoScaleMaterialColumn>
                <AutoScaleMaterialColumn>
                    <AutoScaleMaterialRow>
                        <BetEntry assignValue={firstBet?.assigned ?? 0} value={secondBetSize} />
                    </AutoScaleMaterialRow>
                </AutoScaleMaterialColumn>
            </AutoScaleMaterialRow>
        </>
    )
}