declare class FPSMeter {
    constructor(ancor: any, options: any);
    tickStart(): void;
    tick(): void;
}

namespace Estella.Example.AirHockey {

    export class View extends Core.View {

        protected worldAttributeList: WorldAttributeList;

        protected width: number;
        protected height: number;

        protected renderer: PIXI.SystemRenderer;
        protected stage: PIXI.Container;
        protected grid: PIXI.Graphics;
        protected worldLimit: PIXI.Graphics;

        protected stepNumber: number;

        protected clientListService: Core.IClientListService;

        private onMouseClick = new Core.LiteEvent<IVector>();   

        private onTouchEnd = new Core.LiteEvent<IVector>();  
        private onTouchMove = new Core.LiteEvent<IVector>();  

        private meter: any;

        private touchInt: number;

        private touchStart: IVector;
        private touchIdentifier: number = null;

        protected viewItemListService: IViewItemListService;


        protected clientId: number;

        constructor(rootElement: HTMLDivElement, world: IWorld, clientId: number) {
            super(rootElement, world);

            this.clientId = clientId;


            this.width = world.getWorldAttributeList().getWorldSize()[0];
            this.height = world.getWorldAttributeList().getWorldSize()[1];

            //this.renderer = new PIXI.CanvasRenderer(this.width, this.height);// autoDetectRenderer(this.width, this.height);
            this.renderer = PIXI.autoDetectRenderer(this.width, this.height, { antialias: true });


            //this.renderer.
            //this.renderer.roundPixels = true;
            this.rootElement.appendChild(this.renderer.view);

            this.stage = new PIXI.Container();

            this.stage.interactive = true;

            this.stage.on('mousedown', this.onStageMouseClick.bind(this));
            this.stage.on('touchend', this.onStageTouchEnd.bind(this));

            this.stage.on('touchstart', this.onStageMouseTouchStart.bind(this));

            this.stage.on('touchmove', this.onStageMouseTouchMove.bind(this));

            this.viewItemListService = new ViewItemListService(world.getItemListService(), this.clientId);
            this.viewItemListService.afterAdd().on(this.afterItemAddHahdler.bind(this));
            this.viewItemListService.afterRemove().on(this.afterItemRemoveHahdler.bind(this));


            this.grid = this.drawGrid();
            this.worldLimit = this.drawWordLimit();
            this.stage.addChild(this.grid);
            this.stage.addChild(this.worldLimit);
            this.stepNumber = -1;

            this.meter = <any>(new FPSMeter(rootElement, { position: "relative" }));
        }

        protected afterItemAddHahdler(e: Core.EventEntityListService<IViewItem>): void {
            this.stage.addChild(e.getEntity().getDisplayObject());
        }

        protected afterItemRemoveHahdler(e: Core.EventEntityListService<IViewItem>): void {
            this.stage.removeChild(e.getEntity().getDisplayObject());
        }

        public getRenderer(): PIXI.SystemRenderer {
            return this.renderer;
        }

        protected onStageMouseClick(event) {
            let p = event.data.getLocalPosition(this.stage);
            this.onMouseClick.trigger(p);
        }


        protected onStageMouseTouchMove(event) {
            let p = event.data.getLocalPosition(this.stage);
            this.onMouseClick.trigger(p);

        }

        protected onStageTouchEnd(event) {

            if (this.touchIdentifier === event.data.identifier) {
                let p = event.data.getLocalPosition(this.stage);
                this.onTouchEnd.trigger(p);
                this.touchIdentifier = null;
            }
            else {
                let p = event.data.getLocalPosition(this.stage);
                this.onMouseClick.trigger(p);
            }
        }


        protected onStageMouseTouchStart(event) {
            
            if (this.touchIdentifier === null) {
                this.touchStart = new Vector(event.data.global);
                this.touchIdentifier = event.data.identifier;
            }
        }

        protected refresh(): void {
            

            if (this.worldAttributeList.getStepNumber() == this.stepNumber) {
                return;
            }

            let iterator = this.itemListService.getIterator();

            this.meter.tickStart();

            this.viewItemListService.update();
            if (this.clientId != 1) {
                this.stage.rotation = Math.PI;
                this.stage.pivot.set(this.width, this.height);
            }

            this.renderer.render(this.stage);
            this.meter.tick();
        }

        protected getDrawPoint(p: number): number {
            return p ;
        }

        protected drawWordLimit(): PIXI.Graphics {
            var graphics = new PIXI.Graphics();

            var size = this.worldAttributeList.getWorldSize();

            let width = size[0];
            let height = size[1];


            /*graphics.beginFill(0x333333);
            graphics.lineStyle(0);
            graphics.drawRect(-300, -300, width + 600, height + 600);*/

            graphics.beginFill(0xCCCCCC);
            graphics.lineStyle(2, 0x999999);
            graphics.drawRect(0, 0, width, height);



           var noiseFilter = new PIXI.filters.NoiseFilter();
            noiseFilter.noise = 0.1;

            graphics.filters = [noiseFilter];

            return graphics;
        }

        protected drawGrid(): PIXI.Graphics {
            var graphics = new PIXI.Graphics();

            

            /*graphics.beginFill(0xFFFFFF);
            graphics.lineStyle(0);
            graphics.drawRect(0, 0, this.width, this.height);*/

/*            graphics.lineStyle(1, 0xCCCCCC, 0.5);
            let cellSize = this.cellSize;

            var x = ((this.width) % this.cellSize) / 2;
            var y = ((this.height) % this.cellSize) / 2;

            if (Math.floor(this.width / this.cellSize) % 2 == 0) {
                x = x - this.cellSize / 2;
            }

            if (Math.floor(this.height / this.cellSize) % 2 == 0) {
                y = y - this.cellSize / 2;
            }           

            while (x < this.width) {
                graphics.moveTo(x, 0);
                graphics.lineTo(x, this.height);
                x += cellSize;
            }
            while (y < this.height) {
                graphics.moveTo(0, y);
                graphics.lineTo(this.width, y);
                y += cellSize;
            }*/



            return graphics;
        }



        public mouseClick(): Core.ILiteEvent<IVector> {
            return this.onMouseClick;
        }

        public touchMove(): Core.ILiteEvent<IVector> {
            return this.onTouchMove;
        }

        public touchEnd(): Core.ILiteEvent<IVector> {
            return this.onTouchEnd;
        }
       
    }
}