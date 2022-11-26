import * as React from 'react'
import { ApiClient } from '../../apiclient/ApiClient'
import { APIResponse } from '../../apiclient/models/APIResponse'
import { GameSelectionOption } from '../../apiclient/models/GameSelectionOption'
import { AutoScaleMaterialColumn } from '../common/AutoScaleMaterialColumn'
import { CreateGameScreen } from './CreateGameScreen'
import { SelectGameRow } from './SelectGame/SelectGameRow'

interface SelectGameFormProps {

}

export const SelectGameScreen = (props: SelectGameFormProps): JSX.Element => {
    const [content, changeContent] = React.useState<JSX.Element>(
        <AutoScaleMaterialColumn>
            Loading...
        </AutoScaleMaterialColumn>
    );
    React.useEffect(() => {
        ApiClient.getClient().getAvailableGames().then(
            (value: APIResponse<GameSelectionOption[]>) => {
                if (!value || value.status != 200 || !value.data?.length) {
                    changeContent(<AutoScaleMaterialColumn><CreateGameScreen /></AutoScaleMaterialColumn>);
                }
                else {
                    changeContent(
                        <AutoScaleMaterialColumn>
                            {value.data.map(
                                (option, index) => {
                                    return <SelectGameRow gameDescription={option} key={index} />
                                }
                            )}
                        </AutoScaleMaterialColumn>
                    );
                }
            }
        )
    }, []);
    return content;
}