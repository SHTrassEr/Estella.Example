namespace Estella.Example.Tanks {

    export interface IPhysicsEngine {
        getEngine(): Matter.Engine;
        update(delta: number): void;
    }
}