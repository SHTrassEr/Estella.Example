﻿/// <reference path="CommandHandler.ts" />

namespace Estella.Example.AirHockey {

    export class CommandRegisterClientHandler extends CommandHandler {

        protected world: IWorld;

        constructor(world: IWorld) {
            super(world);
        }

        protected executeCommand(command: CommandRegisterClient): void {
            let client = new ClientActive();
            client.setName(command.getClientName());
            client.setId(command.getClientId());
            this.world.getClientListService().add(client);

            let process = this.world.getEntityFactory().create<ProcessCreateClientItemTank>(ProcessCreateClientItemTank);
            process.setClientId(command.getClientId());
            this.startProcess(process);
        }

        protected isValidCommand(command: CommandRegisterClient): boolean {

            if (this.isSystemCommand(command)) {
                var client = this.world.getClientListService().getFirst(p => p.getId() == command.getClientId());
                if (!client) {
                    return true;
                }
            }

            return false;
        }

        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandRegisterClient;
        }
    }
}