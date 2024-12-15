import * as React from 'react'
import { BetProps } from './BetProps';
import { ClientRole } from '../../enums/ClientRole';
import { BetOpportunityHost } from './BetOpportunityHost';
import { BetOpportunityVP } from './BetOpportunityVP';

export function BetRow(props: BetProps): JSX.Element {
    if (!props.betOpportunity) {
        return <></>;
    }
    if (props.realRole == ClientRole.Host) {
        return <BetOpportunityHost {...props} />
    }
    return <BetOpportunityVP {...props} />
}