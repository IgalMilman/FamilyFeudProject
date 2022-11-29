import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface SelectMultipleItemsProps {
    title?: string;
    isNumber?: boolean;
    currentlySelected: string[] | number[];
    items: { [key: string | number]: string };
    changeSelection: (selectedValues: string[] | number[]) => void;
}

function getStylesString(value: string, selectedValues: readonly string[], theme: Theme) {
    return {
        fontWeight:
            selectedValues.includes(value)
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function getStylesNumber(value: number, selectedValues: readonly number[], theme: Theme) {
    return {
        fontWeight:
            selectedValues.includes(value)
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export const SelectMultipleItems = (props: SelectMultipleItemsProps): JSX.Element => {
    const theme = useTheme();
    const getStyles = (value: number | string) => typeof value === 'number' ?
        getStylesNumber(value as number, props.currentlySelected as number[], theme) :
        getStylesString(value as string, props.currentlySelected as string[], theme)

    const handleChangeMultiple = (event: SelectChangeEvent<string[] | number[]>) => {
        const {
            target: { value },
        } = event;
        const result = (typeof value === 'string' ? value.split(',') : value);
        if (result.length == 0) {
            props.changeSelection([]);
            return;
        }
        if (props.isNumber) {
            const resultUnique: Set<number> = new Set();
            for (const val of result) {
                resultUnique.add(typeof val === 'number' ? val as number : parseInt(val as string));
            }
            props.changeSelection(Array.from(resultUnique));
        }
        else {
            const resultUnique: Set<string> = new Set();
            for (const val of result) {
                resultUnique.add(props.isNumber && typeof val === 'number' ?
                    (val as number).toString() : val as string);
            }
            props.changeSelection(Array.from(resultUnique));
        }
    };

    return (
        <>
            <FormControl sx={{ width: 300 }}>
                {props.title && <InputLabel shrink htmlFor="select-multiple-native">
                    {props.title}
                </InputLabel>}
                <Select
                    multiple
                    value={props.currentlySelected.map(value=>value.toString())}
                    onChange={handleChangeMultiple}
                    input={<OutlinedInput label={props.title} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={props.items[value]} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {Object.entries(props.items).map(([key, value]) => (
                        <MenuItem
                            key={key}
                            value={key}
                            style={getStyles(value)}
                        >
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}