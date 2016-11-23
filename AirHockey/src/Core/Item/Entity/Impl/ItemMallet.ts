/// <reference path="Item.ts" />

namespace Estella.Example.AirHockey {

    export class ItemMallet extends Item implements IItemMallet {

        private _clientForceVector: number = ++this.lastAttributeId;
        private _clientForceModifier: number = ++this.lastAttributeId;
        private _moveToPosition: number = ++this.lastAttributeId;

        protected createBody(): Matter.Body {
            let body = Matter.Bodies.circle(0, 0, this.getRadius(), { restitution: 0, density: 0.001, friction: 0, frictionAir: 0.1, frictionStatic: 0.5, inertia: Infinity, label: ItemMallet.name });
            return body;
        }

        public getRadius(): number {
            return 30;
        }

        public getMoveToPosition(): IVector {
            return VectorHelper.parse(this.attributeList.get(this._moveToPosition));
        }

        public setMoveToPosition(position: IVector): void {
            this.attributeList.set(this._moveToPosition, position);
        }
    }

    export module ItemMallet {
        export const type = ModuleInfo.name + '.' + ItemMallet.name;
    }
}