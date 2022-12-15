import * as React from 'react'
import { AccessCode } from '../../../apiclient/models/AccessCode';
import { AutoScaleMaterialColumn } from '../../common/AutoScaleMaterialColumn';
import { AvailableAccessCodesCell } from './AvailableAccessCodesCell';


interface AvailableAccessCodesTableProps {
    accessCodeListing: AccessCode[];
}

export const AvailableAccessCodesTable = (props: AvailableAccessCodesTableProps): JSX.Element => {
    return <>
        {
            props.accessCodeListing.filter((value)=>!value.user?.is_default).map(
                (accessCode, index)=> {
                    return <AutoScaleMaterialColumn key={index} spacing={1}>
                        <AvailableAccessCodesCell accessCode={accessCode} />
                    </AutoScaleMaterialColumn>
                }
            )
        }
    </>
}