namespace Estella.Example.AirHockey {

    export interface IClientActive extends Core.IClient {

        getScore(): number;
        setScore(score: number): void;
    }
}