namespace Estella.Example.AirHockey {

    export interface IWorld extends Core.IWorld{
        getWorldAttributeList(): IWorldAttributeList;
        getItemListService(): IItemListService;
        getClientListService(): IClientListService;

        getCollisionService(): ICollisionService;
        getPhysicsEngine(): IPhysicsEngine;
    }
}