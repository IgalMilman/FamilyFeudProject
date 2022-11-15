import * as React from 'react'
import { MultiTextCreationObject } from '../../../apiclient/models/createrequests/MultiTextCreationObject'
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow'
import { OneTextInput } from './OneTextInput';

interface MultiTextInputProps {
    items: MultiTextCreationObject[];
    title?: string;
    optional?: boolean;
}

export const MultiTextInput = (props: MultiTextInputProps): JSX.Element => {
    return <>
        {props.items.map(
            (value, index) => {
                return (
                    <AutoScaleMaterialRow key={index}>
                        <OneTextInput
                            value={value.text}
                            optional={props.optional}
                            title={`${props.title} language ${index + 1}`}
                            onChange={(text: string) => {
                                value.text = text;
                            }} />
                    </AutoScaleMaterialRow>
                )
            }
        )}
    </>
}