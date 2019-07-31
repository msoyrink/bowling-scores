import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { InputLabel, Select, FormControl, Button } from '@material-ui/core';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { format } from 'date-fns'
import firebase from './firebase';
import { places } from './Keilahallit';

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

interface State {
    name: string,
    place: string,
    result: number,
    pvm: Date,
    series: number,
    info?: string,
}

interface ResultProps {
    id?: string,
}

const ScoreFields: React.FC<ResultProps> = (props) => {
    const classes = useStyles();
    const [values, setValues] = useState<State>({
        name: "",
        place: "",
        info: "",
        result: 0,
        series: 6,
        pvm: new Date(),
    });

    useEffect(() => {
        const fetchData = async () => {
            const result: any = await firebase.getScoreById(props.id)
            setValues(result)
        }

        if (props.id) fetchData()

    }, [props.id]);

    const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleChangeNumber = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: parseInt(event.target.value, 10) });
    };

    const handleDateChange = (value: any) => {
        console.log(value)
        const formatvalue = format(value, 'dd.MM.yyyy')
        console.log(formatvalue)
        setValues({ ...values, pvm: value });
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

            <KeyboardDatePicker
                className={classes.textField}
                clearable
                value={values.pvm}
                onChange={(newValue) => handleDateChange(newValue)}
                format="dd.MM.yyyy"
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
                    {places.map((place, index) => <option key={index} value={place}>{place}</option>)}
                </Select>
            </FormControl>

            <TextField
                id="result"
                label="Tulos"
                value={values.result}
                onChange={handleChangeNumber('result')}
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
                onChange={handleChangeNumber('series')}
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
        </form>
    )

    async function onSave() {
        try {
            console.log(values)
            await firebase.addScore(values)
            // props.children..history.replace('/')
        } catch (error) {
            alert(error.message)
        }
    }

}

export default ScoreFields;