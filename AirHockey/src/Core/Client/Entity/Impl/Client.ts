/// <reference path="../../../Entity/Impl/Entity.ts" />

namespace Estella.Example.AirHockey {

    export abstract class Client extends Core.Client implements IClient {

    }

    export module Client {
        export const type = ModuleInfo.name + '.' + Client.name;
    }
}