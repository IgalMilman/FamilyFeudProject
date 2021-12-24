import * as React from 'react'
import { QuestionProps } from './QuestionProps'
import { FamilyFeudAnswer } from './FamilyFeudAnswer'
import { Table, TableBody } from '@mui/material'
import { AutoScaleMaterialRow } from '../../common/AutoScaleMaterialRow'

export function FamilyFeudQuestion(props: QuestionProps): JSX.Element {
    return (
        <AutoScaleMaterialRow>
            <Table>
                <TableBody>
                    {props.question?.real_answers?.map((answer, index) => <FamilyFeudAnswer key={index} answer={answer} />)}
                </TableBody>
            </Table>
        </AutoScaleMaterialRow>
    )
}