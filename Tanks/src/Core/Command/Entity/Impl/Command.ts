﻿/// <reference path="../../../Entity/Impl/Entity.ts" />

namespace Estella.Example.Tanks {

    export abstract class Command extends Core.Command implements ICommand {

    }

    export module Command {
        export const type = ModuleInfo.name + '.' + Command.name;
    }
}