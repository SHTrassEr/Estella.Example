/// <reference path="Item.ts" />

namespace Estella.Example.AirHockey {

    export class ItemTank extends Item implements IItemTank, IItemRectangle  {

        private _clientForceVector: number = ++this.lastAttributeId;
        private _clientForceModifier: number = ++this.lastAttributeId;
        private _moveToPosition: number = ++this.lastAttributeId;

        protected createBody(): Matter.Body {
            let body = Matter.Bodies.circle(200, 200, this.getWidth() / 2, { restitution: 0, density: 0.001, friction: 0, frictionAir: 0.1, frictionStatic: 0.5, inertia: Infinity, label: "ItemTank" });
            return body;
        }

        public getWidth(): number {
            return 62;
        }

        public setSize(width: number, height: number): void {
            let newRectangle = Matter.Bodies.rectangle(this.body.position.x, this.body.position.y, width, height);
            Matter.Body.setVertices(this.body, newRectangle.vertices);
        }

        public getHeight(): number {
            return 62;
        }

        public getMoveToPosition(): IVector {
            return VectorHelper.parse(this.attributeList.get(this._moveToPosition));
        }

        public setMoveToPosition(position: IVector): void {
            this.attributeList.set(this._moveToPosition, position);
        }

    }

    export module ItemTank {
        export const type = ModuleInfo.name + '.' + ItemTank.name;
    }
}