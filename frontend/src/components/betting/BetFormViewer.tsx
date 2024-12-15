import * as React from 'react'
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn';
import { AllLanguageOutput } from '../common/AllLanguageOutput';
import { BaseAppProps } from "../common/AppProps";

interface BettingViewerViewPointProps extends BaseAppProps {
}

export const BetFormViewer = (props: BettingViewerViewPointProps): JSX.Element => {
    return <AutoScaleMaterialColumn>
        {<AllLanguageOutput text={["Place your bets!"]} />}
    </AutoScaleMaterialColumn>
}