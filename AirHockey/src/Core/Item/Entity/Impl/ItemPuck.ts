/// <reference path="Item.ts" />

namespace Estella.Example.AirHockey {

    export class ItemPuck extends Item implements IItemMallet  {

        private _clientForceVector: number = ++this.lastAttributeId;
        private _clientForceModifier: number = ++this.lastAttributeId;

        protected createBody(): Matter.Body {
            let body = Matter.Bodies.circle(200, 200, this.getRadius(), { restitution: 1, density: 0.001, friction: 0, frictionAir: 0.001, frictionStatic: 0.5, inertia: Infinity, label: "ItemTank" });
            return body;
        }

        public getRadius(): number {
            return 20;
        }
        
    }

    export module ItemPuck {
        export const type = ModuleInfo.name + '.' + ItemPuck.name;
    }
}