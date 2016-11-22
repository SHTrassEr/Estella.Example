/// <reference path="Command.ts" />

namespace Estella.Example.AirHockey {

    export class CommandInitWorld extends Command {

    }

    export module CommandInitWorld {
        export const type = ModuleInfo.name + '.' + CommandInitWorld.name;
    }
}
