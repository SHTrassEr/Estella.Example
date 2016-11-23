
namespace Estella.Example.AirHockey {

    export class ViewItemMallet extends ViewItem implements IViewItem {

        protected createDisplayObject(item: ItemMallet, clientId: number): PIXI.DisplayObject {
            var graphics = new PIXI.Graphics();

            if (this.isOwner()) {
                graphics.beginFill(0xFFFF00);
                graphics.lineStyle(1, 0x0000AA);
            } else {
                graphics.beginFill(0xFFFF00);
                graphics.lineStyle(1, 0x770000);
            }

            graphics.drawCircle(0, 0, item.getRadius());

            graphics.pivot.set(0, 0);
            return graphics;
        }

        protected getItemType(): typeof Item {
            return ItemMallet;
        }
    }

    export module ViewItemMallet {
        export const type = ModuleInfo.name + '.' + ViewItemMallet.name;
    }
}