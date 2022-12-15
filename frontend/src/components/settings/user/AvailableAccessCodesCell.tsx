import * as React from 'react'
import QRCode from 'react-qr-code';
import { AccessCode } from '../../../apiclient/models/AccessCode';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';


interface AvailableAccessCodesCellProps {
    accessCode: AccessCode;
}

function getAccessCodeURL(code: string): string {
    return window.location.host + '/login/accesscode?access_code=' + code;
}

export const AvailableAccessCodesCell = (props: AvailableAccessCodesCellProps): JSX.Element => {
    return <>
        <AutoScaleMaterialRow>
            <QRCode
                size={125}
                value={getAccessCodeURL(props.accessCode.access_code)}
                id={props.accessCode.id.toString()}
            />
        </AutoScaleMaterialRow>
        <AutoScaleMaterialRow>
            {props.accessCode?.access_code}
        </AutoScaleMaterialRow>
    </>
}