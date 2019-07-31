export interface IScores {
    id: string,
    name: string,
    place: string,
    result: number,
    pvm: Date,
    series: number,
    strikes: number,
    info?: string,
}

export interface IState extends IScores {

}

export interface IScoredetails {
    pvm: string,
    series: number,
    strikes: number,
    info: string,
}