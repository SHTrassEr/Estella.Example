
namespace Estella.Example.AirHockey {

    export class ViewItemListService extends Core.EntityListService<IViewItem> implements IViewItemListService {

        protected viewItemMap: Map<string, typeof ViewItem>;
        protected itemListService: IItemListService;
        protected clientId: number;

        constructor(itemListService: IItemListService, clientId: number) {
            super();
            this.itemListService = itemListService;
            this.viewItemMap = new Map<string, typeof ViewItem>();
            this.initViewItemMap(this.viewItemMap);

            itemListService.afterAdd().on(this.afterItemAddHahdler.bind(this));
            itemListService.afterRemove().on(this.afterItemRemoveHahdler.bind(this));
        }

        public update(): void {
            for (let viewItem of this.getIterator()) {
                viewItem.update();
            }
        }

        protected initViewItemMap(viewItemMap: Map<string, typeof ViewItem>) {
            viewItemMap.set(ItemMallet.type, ViewItemMallet);
            viewItemMap.set(ItemPuck.type, ViewItemPuck);
        }

        protected createViewItem(item: IItem): IViewItem {
            let t = <any>(this.viewItemMap.get(item.getType()));
            if (t) {
                return new t(item, this.clientId);
            }

            return null;
        }

        protected afterItemAddHahdler(e: Core.EventEntityListService<IItem>): void {
            let viewItem = this.createViewItem(e.getEntity());
            if (viewItem) {
                this.add(viewItem);
            }
        }

        protected afterItemRemoveHahdler(e: Core.EventEntityListService<IItem>): void {
            let itemId = e.getEntity().getId();
            if (this.has(itemId)) {
                this.remove(itemId);
            }
        }
    }
}