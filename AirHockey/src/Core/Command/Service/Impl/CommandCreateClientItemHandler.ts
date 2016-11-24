/// <reference path="CommandHandler.ts" />

namespace Estella.Example.AirHockey {

    export class CommandCreateClientItemHandler extends CommandHandler {

        protected world: IWorld;

        constructor(world: IWorld) {
            super(world);
        }

        protected executeCommand(command: CommandCreateClientItem): void {
            var process = this.world.getEntityFactory().create<ProcessCreateClientItemTank>(ProcessCreateClientItemTank);
            process.setClientId(command.getClientId());
            this.startProcess(process);
        }

        protected isValidCommand(command: CommandCreateClientItem): boolean {
            return this.isSystemCommand(command);
        }

        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandCreateClientItem;
        }
    }
}