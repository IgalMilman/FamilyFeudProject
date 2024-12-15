import * as React from 'react';
import { AutoScaleMaterialColumn } from "../common/AutoScaleMaterialColumn";
import { BetProps } from "./BetProps";
import { BetOpportunityHost } from './BetOpportunityHost';

export function BetFormHost(props: BetProps): JSX.Element {
    if (!props.betOpportunity) {
        return <></>;
    }
    return <AutoScaleMaterialColumn spacing={1}>
        <BetOpportunityHost {...props} />
    </AutoScaleMaterialColumn>
}