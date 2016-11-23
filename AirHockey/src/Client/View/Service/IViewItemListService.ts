namespace Estella.Example.AirHockey {

    export interface IViewItemListService extends Core.IEntityListService<IViewItem>{
        update(): void;
    }
}