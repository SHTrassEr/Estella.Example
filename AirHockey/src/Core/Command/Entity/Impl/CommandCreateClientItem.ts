﻿/// <reference path="Command.ts" />

namespace Estella.Example.AirHockey {

    export class CommandCreateClientItem extends Command {

        private _clientId: number = ++this.lastAttributeId;

        public getClientId(): number {
            return this.attributeList.get(this._clientId);
        }

        public setClientId(id: number): void {
            this.attributeList.set(this._clientId, id);
        }
    }

    export module CommandCreateClientItem {
        export const type = ModuleInfo.name + '.' + CommandCreateClientItem.name;
    }
}
