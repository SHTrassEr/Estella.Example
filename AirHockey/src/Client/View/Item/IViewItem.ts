
namespace Estella.Example.AirHockey {

    export interface IViewItem extends Core.IEntity {

        getDisplayObject(): PIXI.DisplayObject;
        update(): void;
    }
}