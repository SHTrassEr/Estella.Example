namespace Estella.Example.AirHockey {

    export class ClientAction extends Core.ClientAction implements IClientAction {

        protected onActionHandler: (clientAction: IClientAction) => void;

        protected addCommand(command: Estella.Core.ICommand): void {
            this.commandListService.add(command);
            this.onAction();
        }

        public setClientForceVector(itemId: number, vector: IVector): void {
            var command = new CommandApplyForce();
            command.setItemId(itemId);
            command.setForce(vector);
            this.addCommand(command);
        }

        public moveTo(itemId: number, position: IVector): void {
            var command = new CommandMoveTo();
            command.setItemId(itemId);
            command.setPosition(position);
            this.addCommand(command);
        }

        public changeClientName(clientId: number, name: string): void {
            var command = new CommandChangeClientName();
            command.setClientId(clientId);
            command.setClientName(name);
            this.addCommand(command);
        }
    }
}
