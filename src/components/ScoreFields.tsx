import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { InputLabel, Select, FormControl, Button } from '@material-ui/core';
import firebase from './firebase';
import { withRouter } from 'react-router-dom';

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
        submit: {
            marginTop: theme.spacing(3),
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

const ScoreFields: React.FC<ResultProps> = (props: any) => {
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

    const handleFormSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<boolean> => {
        e.preventDefault();
        return false
    };

    return (
        <form className={classes.container} noValidate autoComplete="off" onSubmit={handleFormSubmit}>
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
            <TextField
                id="date"
                label="Pvm"
                type="date"
                defaultValue=""
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                value={values.pvm}
                onChange={handleChange('pvm')}
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
                    {places.map( (place, index) => <option key={index} value={place}>{place}</option>)}
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
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={onSave}
                className={classes.submit}>
                Tallenna
          			</Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={getAll}
                className={classes.submit}>
                Hae
          			</Button>
        </form>
    )

    async function onSave() {
        try {
            await firebase.addScore(values)
            props.history.replace('/')
        } catch (error) {
            alert(error.message)
        }
    }
    function getAll() {
        try {
            const s = firebase.getAllScores()
            console.log(s)
        } catch (error) {
            alert(error.message)
        }
    }
}

export default withRouter((ScoreFields) as any);