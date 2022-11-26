import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';

interface SelectMultipleItemsProps {
    title?: string;
    currentlySelected: string[] | number[];
    items: { [key: string|number]: string };
    changeSelection: (selectedValues: string[]| number[]) => void;
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

export const SelectMultipleItems = (props: SelectMultipleItemsProps): JSX.Element => {
    const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        props.changeSelection(value);
    };

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                {props.title && <InputLabel shrink htmlFor="select-multiple-native">
                    {props.title}
                </InputLabel>}
                <Select
                    multiple
                    native
                    value={props.currentlySelected}
                    // @ts-ignore Typings are not considering `native`
                    onChange={handleChangeMultiple}
                    label="Native"
                    inputProps={{
                        id: 'select-multiple-native',
                    }}
                >
                    {Object.entries(props.items).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}