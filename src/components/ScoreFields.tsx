import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { InputLabel, Select, FormControl } from '@material-ui/core';
import { blockStatement } from '@babel/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 300,
            display: "block",
        },
        textFieldInfo: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            display: "block",
        },
        selectField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 300,
            display: "block",
        },
        dense: {
            marginTop: 19,
        },
        menu: {
            width: 200,
        },
    }),
);

const places = [
    "Kemin keilahalli",
    "Tornion keilahalli",
    "Rovaniemen keilahalli",
]

interface State {
    name: string,
    place: string,
    result?: number,
    pvm?: Date,
    series?: string,
    info?: string,
}

interface ResultProps {
    name?: string,
    place?: string,
    result?: number,
    pvm?: Date,
    series?: string,
    info?: string,
}

const ScoreFields: React.FC<ResultProps> = (props) => {
    const classes = useStyles();
    const [values, setValues] = useState<State>({
        name: "",
        place: "",
        info: "",
    });

    useEffect(() => {
        /* const result = await axios(
          'http://hn.algolia.com/api/v1/search?query=redux',
        );
    
        setData(result.data); */

    });

    const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSelectChange = (name: keyof typeof values) => (
        event: React.ChangeEvent<{ value: unknown }>,
    ) => {
        setValues({
            ...values,
            [name]: event.target.value,
        });
    };

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                className={classes.textField}
                required
                id="name"
                label="Nimi"
                value={values.name}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleChange('name')}
                margin="normal"
            />
            <FormControl className={classes.selectField}>
                <InputLabel htmlFor="place-select" shrink={true}>Keilahalli</InputLabel>
                <Select
                    native
                    value={values.place}
                    onChange={handleSelectChange('place')}

                    inputProps={{
                        name: 'place',
                        id: 'place-select',
                    }}
                >
                    <option value=""></option>
                    {places.map(place => <option value={place}>{place}</option>)}
                </Select>
            </FormControl>

            <TextField
                id="result"
                label="Tulos"
                value={values.result}
                onChange={handleChange('result')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
            <TextField
                id="rsarjat"
                label="Sarjamäärä"
                value={values.series}
                onChange={handleChange('series')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
            <TextField
                id="lisatietoja"
                label="Lisätietoja"
                multiline
                rows="3"
                rowsMax="5"
                fullWidth
                value={values.info}
                onChange={handleChange('info')}
                InputLabelProps={{
                    shrink: true,
                }}
                className={classes.textFieldInfo}
                margin="normal"
            />
        </form>
    );
}

export default ScoreFields;