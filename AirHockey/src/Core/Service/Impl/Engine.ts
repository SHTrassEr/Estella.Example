
namespace Estella.Example.AirHockey {

    export class Engine extends Core.Engine implements IEngine{

        protected world: IWorld;
        private meter: any;

        private onBeforePhysicsEngineUpdate = new Estella.Core.LiteEvent<IEngine>();
        private onAfterPhysicsEngineUpdate = new Estella.Core.LiteEvent<IEngine>();   

        constructor(world: IWorld, commandListService: Estella.Core.ICommandListService) {
            super(world, commandListService);
            this.afterUpdate().on(this.updatePhysicsEngine.bind(this));
        }

        protected updatePhysicsEngine(event: Core.IEventEngine) {
            this.onBeforePhysicsEngineUpdate.trigger(this);
            let engine = this.world.getPhysicsEngine();
            let tickLength = this.world.getWorldAttributeList().getTickLength();
            engine.update(tickLength);
            this.onAfterPhysicsEngineUpdate.trigger(this);
        }

        public getWorld(): IWorld {
            return this.world;
        }
        

        public beforePhysicsEngineUpdate(): Estella.Core.ILiteEvent<IEngine> {
            return this.onAfterPhysicsEngineUpdate;
        }


        public afterPhysicsEngineUpdate(): Estella.Core.ILiteEvent<IEngine> {
            return this.onAfterPhysicsEngineUpdate;
        }
        
    }
}