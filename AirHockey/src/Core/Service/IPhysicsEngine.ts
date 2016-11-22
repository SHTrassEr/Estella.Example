namespace Estella.Example.AirHockey {

    export interface IPhysicsEngine {
        getEngine(): Matter.Engine;
        update(delta: number): void;
    }
}