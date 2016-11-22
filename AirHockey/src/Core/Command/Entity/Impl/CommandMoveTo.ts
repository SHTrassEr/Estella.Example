/// <reference path="Command.ts" />

namespace Estella.Example.AirHockey {

    export class CommandMoveTo extends Command {

        private _itemId: number = ++this.lastAttributeId;
        private _force: number = ++this.lastAttributeId;

        public getItemId(): number {
            return this.attributeList.get(this._itemId);
        }

        public setItemId(id: number): void {
            this.attributeList.set(this._itemId, id);
        }

        public getPosition(): IVector {
            return VectorHelper.parse(this.attributeList.get(this._force));
        }

        public setPosition(force: IVector): void {
            this.attributeList.set(this._force, new Vector(force));
        }
    }

    export module CommandMoveTo {
        export const type = ModuleInfo.name + '.' + CommandMoveTo.name;
    }
}
