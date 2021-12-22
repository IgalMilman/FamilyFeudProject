import * as React from 'react'
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow'
import StyledButton from '../../styled/Button'

export const LoginButton = (): JSX.Element => {
    return <AutoScaleMaterialRow>
        <StyledButton type="submit">
            Login
        </StyledButton>
    </AutoScaleMaterialRow>
}