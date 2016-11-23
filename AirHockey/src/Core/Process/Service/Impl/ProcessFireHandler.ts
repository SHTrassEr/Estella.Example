namespace Estella.Example.AirHockey {

    export class ProcessFireHandler extends Core.ProcessHandler {

        protected world: IWorld;

        constructor(world: IWorld) {
            super(world);
        }

        public executeProcess(process: ProcessFire): void {
            let item = this.world.getItemListService().getTyped<ItemMallet>(process.getItemId(), ItemMallet); 
            if (item) {
                this.fire(process, item);
            }

            process.setStatus(Core.ProcessStatus.Finished);
        }

        protected fire(process: ProcessFire, item: ItemMallet): void {
            var bullet = this.world.getEntityFactory().create<ItemBullet>(ItemBullet);
            bullet.setPosition(item.getPosition());
            bullet.setClientId(item.getClientId());

            bullet.setFriction(0.1);

            var force = process.getPosition();
            VectorHelper.substract(force, item.getPosition());
            VectorHelper.normalize(force);
            bullet.setForce(force);
            bullet.setMass(10);
            bullet.setForceScale(0.01);
            bullet.setVelocity(item.getVelocity());
            

            this.world.getItemListService().add(bullet);

            var moveProcess = this.world.getEntityFactory().create<ProcessMoveItem>(ProcessMoveItem);

            moveProcess.setItemId(bullet.getId());

            this.startProcess(moveProcess);

        }

    }
}