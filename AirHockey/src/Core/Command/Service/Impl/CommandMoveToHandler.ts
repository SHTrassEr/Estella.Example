/// <reference path="CommandHandler.ts" />

namespace Estella.Example.AirHockey {

    export class CommandMoveToHandler extends CommandHandler {

        protected world: IWorld;

        constructor(world: IWorld) {
            super(world);
        }

        protected executeCommand(command: CommandMoveTo): void {
            let item = this.world.getItemListService().getTyped<ItemMallet>(command.getItemId(), ItemMallet);

            item.setMoveToPosition(command.getPosition());
        }

        protected isValidCommand(command: CommandMoveTo): boolean {
            return this.isCommandInitiatorIdEqualsItemClientId(command, command.getItemId());
        }

        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandMoveTo;
        }
    }
}