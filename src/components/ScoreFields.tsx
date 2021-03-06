import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { DatePicker } from "@material-ui/pickers";
import TextField from '@material-ui/core/TextField';
import { InputLabel, Select, FormControl, Button } from '@material-ui/core';
import firebase from './firebase';
import { places } from './Keilahallit';
import { IState } from '../ts/interfaces/score_interface';
import CustomizedSnackbars from './Snackbar';

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
        dateField: {
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



interface ResultProps {
    id?: string,
}

const ScoreFields: React.FC<ResultProps> = (props) => {
    const classes = useStyles();
    const [values, setValues] = useState<IState>({
        id: "",
        name: "",
        place: "",
        info: "",
        result: 1200,
        series: 6,
        strikes: 0,
        pvm: new Date(),
    });
    const [snackopen, setSnackopen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result: any = await firebase.getScoreById(props.id)
            setValues(result)
        }

        if (props.id) fetchData()

    }, [props.id]);

    const handlesnackclose = () => {
        setSnackopen(false)
    }

    const handleChange = (name: keyof IState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleDateChange = (value: any) => {
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

            <DatePicker
                className={classes.dateField}
                value={values.pvm}
                onChange={(newValue) => handleDateChange(newValue)}
                format="dd.MM.yyyy"
                margin="normal"
            />
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
                id="kaadot"
                label="kaadot"
                value={values.strikes}
                onChange={handleChange('strikes')}
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
            <CustomizedSnackbars message="Tiedot tallennettu" variant="success" sopen={snackopen} close={handlesnackclose} />
        </form>
    )

    async function onSave() {
        try {
            const scoredata: any = await firebase.addScore(values)
            const id: string = scoredata ? scoredata.id : null
            if (id) {
                //new score value
                setValues({ ...values, id: id });
            }
            setSnackopen(true)

            // props.children..history.replace('/')
        } catch (error) {
            alert(error.message)
        }
    }

}

export default ScoreFields;