import * as React from 'react'
import StyledLanguageOutput from '../styled/LanguageOutput';

interface AllLanguageOutputProps {
    text: string[];
    props?: {};
}

export function AllLanguageOutput(props: AllLanguageOutputProps): JSX.Element {
    let elements: JSX.Element[] = [];
    props.text?.forEach(
        (text, index) =>{
            elements.push(<StyledLanguageOutput key={index} {...props.props}>
            {text}
        </StyledLanguageOutput>);
        }
    );
    return (<>{elements}</>);
}