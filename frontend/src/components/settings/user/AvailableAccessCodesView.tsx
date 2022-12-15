import * as React from 'react'
import ReactToPrint from 'react-to-print';
import { ApiClient } from '../../../apiclient/ApiClient';
import { AccessCode } from '../../../apiclient/models/AccessCode';
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow';
import { InputFieldWithLabel } from '../../common/InputFieldWithLabel';
import { MessageArea, MessageAreaProps } from '../../common/MessageArea';
import StyledButton from '../../styled/Button';
import { AvailableAccessCodesTable } from './AvailableAccessCodesTable';


interface AvailableAccessCodesViewProps {
    accessCodeListing: AccessCode[];
    triggerUpdatePlayers: ()=>void;
}

class PrintableTable extends React.PureComponent<AvailableAccessCodesViewProps> {
    constructor(props: AvailableAccessCodesViewProps) {
        super(props);
    }

    render() {
        return (
            <AutoScaleMaterialRow spacing={5}>
                <AvailableAccessCodesTable {...this.props} />
            </AutoScaleMaterialRow>
        );
    }
}

export const AvailableAccessCodesView = (props: AvailableAccessCodesViewProps): JSX.Element => {
    const [numberOfPlayers, setNumberOfPlayers] = React.useState<number>(0);
    const [message, changeMessage] = React.useState<MessageAreaProps>(null);

    const createUsers = () => {
        ApiClient.getClient().generatePlayers(numberOfPlayers).then((codes) => {
            if (codes) {
                changeMessage({
                    text: "Successfully deactivated the user",
                    type: 'success',
                });
                props.triggerUpdatePlayers();
            }
            else {
                changeMessage({
                    text: "Could not deactivate the user",
                    type: 'error',
                });
            }
            setTimeout(() => { changeMessage(null) }, 10000);
        }
        );
    };

    const changeNumberOfPlayers = (value: string) => {
        setNumberOfPlayers(parseInt(value));
    }
    const refer = React.useRef();
    return <>
        <AutoScaleMaterialRow>
            <ReactToPrint
                content={() => refer.current}
                trigger={() => <StyledButton>
                    Print
                </StyledButton>
                }
            >
            </ReactToPrint>
        </AutoScaleMaterialRow>
        {message && <MessageArea {...message} />}
        <AutoScaleMaterialRow>
            <InputFieldWithLabel
                label={'Number of players'}
                name={'number_of_players'}
                inputtype={'number'}
                currentValue={numberOfPlayers.toString()}
                onChange={changeNumberOfPlayers}
                required={true}
            />
        </AutoScaleMaterialRow>
        <AutoScaleMaterialRow>
            <StyledButton onClick={createUsers}>
                Generate new users
            </StyledButton>
        </AutoScaleMaterialRow>
        <PrintableTable ref={refer} {...props} />
    </>
}