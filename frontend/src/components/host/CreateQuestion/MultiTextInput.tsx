import * as React from 'react'
import { MultiTextCreationObject } from '../../../apiclient/models/createrequests/MultiTextCreationObject'
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow'
import { OneTextInput } from './OneTextInput';

interface MultiTextInputProps {
    numberOfLanguages: number;
    title?: string;
    optional?: boolean;
    setObject: (createdObjects: MultiTextCreationObject[]) => void;
}

export const MultiTextInput = (props: MultiTextInputProps): JSX.Element => {
    let items: MultiTextCreationObject[] = [];
    for (let i = 0; i < props.numberOfLanguages; i++) {
        const obj = new MultiTextCreationObject();
        obj.sort_order = i;
        obj.text = '';
        items.push(obj);
    }
    props.setObject(items);
    return <>
        {items.map(
            (value, index) => {
                return (
                    <AutoScaleMaterialRow key={index}>
                        <OneTextInput
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