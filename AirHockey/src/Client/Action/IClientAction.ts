namespace Estella.Example.AirHockey {

    export interface IClientAction extends Core.IClientAction {

        changeClientName(clientId: number, name: string): void;
        setClientForceVector(itemId: number, vector: IVector): void;
        moveTo(itemId: number, position: IVector): void;
    }
}