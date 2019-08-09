import React, { Fragment } from 'react';
import { IScoredetails } from '../ts/interfaces/score_interface';

const ScoreListDetails: React.SFC<IScoredetails> = ({
    pvm,
    series,
    strikes,
    info }) => {

    return (
        <Fragment>
            Sarjat: {series} <br />
            Kaadot: {strikes} <br />
            <br />
            {info}
        </Fragment>
    )
}


export default ScoreListDetails;