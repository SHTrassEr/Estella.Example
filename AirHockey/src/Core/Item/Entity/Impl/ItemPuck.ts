/// <reference path="Item.ts" />

namespace Estella.Example.AirHockey {

    export class ItemPuck extends Item implements IItemTank, IItemRectangle  {

        private _clientForceVector: number = ++this.lastAttributeId;
        private _clientForceModifier: number = ++this.lastAttributeId;

        protected createBody(): Matter.Body {
            let body = Matter.Bodies.circle(200, 200, this.getWidth() / 2, { restitution: 1, density: 0.001, friction: 0, frictionAir: 0.001, frictionStatic: 0.5, inertia: Infinity, label: "ItemTank" });
            return body;
        }

        public getWidth(): number {
            return 40;
        }

        public setSize(width: number, height: number): void {
            let newRectangle = Matter.Bodies.rectangle(this.body.position.x, this.body.position.y, width, height);
            Matter.Body.setVertices(this.body, newRectangle.vertices);
        }

        public getHeight(): number {
            return 40;
        }
    }

    export module ItemPuck {
        export const type = ModuleInfo.name + '.' + ItemPuck.name;
    }
}