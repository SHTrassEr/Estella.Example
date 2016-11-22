namespace Estella.Example.AirHockey {;

    export interface IEngine extends Core.IEngine {
        getWorld(): IWorld;
        getCommandListService(): Estella.Core.ICommandListService;
        update(): void;
        getCommandList(): Estella.Core.ICommand[];

        beforePhysicsEngineUpdate(): Estella.Core.ILiteEvent<IEngine>;
        afterPhysicsEngineUpdate(): Estella.Core.ILiteEvent<IEngine>;

    }
}