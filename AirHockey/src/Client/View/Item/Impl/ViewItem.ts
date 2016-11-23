
namespace Estella.Example.AirHockey {

    export abstract class ViewItem extends Core.Entity implements IViewItem {

        protected item: IItem;
        protected clientId: number;
        protected displayObject: PIXI.DisplayObject

        constructor(item: IItem, clientId: number) {
            super();
            this.validateItemType(item);
            this.setId(item.getId());
            this.item = item;
            this.clientId = clientId;

            this.displayObject = this.createDisplayObject(item, clientId);
            if (!this.displayObject) {
                throw new Error();
            }
        }

        protected abstract createDisplayObject(item: IItem, clientId: number): PIXI.DisplayObject;

        public getDisplayObject(): PIXI.DisplayObject {
            return this.displayObject;
        }

        public update(): void {
            let position = this.item.getPosition();
            this.displayObject.position.set(position.x, position.y);
        }

        protected validateItemType(item: IItem) {
            let t = this.getItemType();
            if (!(item instanceof t)) {
                throw new Error();
            }
        }

        protected getItemType(): typeof Item {
            return Item;
        }

        protected isOwner() {
            return this.clientId === this.item.getClientId();
        }
    }
}