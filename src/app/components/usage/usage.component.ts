import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.css'],
})
export class UsageComponent implements OnInit {
  products: Product[] = [];
  inventory: any[] = [];
  dailyUsage: any[] = [];
  displayItems: any[] = [];

  sortDirection: string = 'asc';
  sortKey: string = 'Product';

  constructor(
    private readonly productsService: ProductsService,
    private readonly notificationsService: NotificationsService
  ) {
    this.productsService.loadProducts.subscribe(() => {
      this.products = this.productsService.products;
      this.displayDailyUsage();
    });
  }

  async ngOnInit(): Promise<void> {
    this.products = this.productsService.products;
    this.dailyUsage = await this.productsService.getUsage();
    this.inventory = await this.productsService.getInventory();
    this.displayDailyUsage();
  }

  /* Build an array of objects with the products daily usage and amount */
  displayDailyUsage(): void {
    this.displayItems = [];
    if (this.dailyUsage.length < 1) return;
    this.products.map((product: Product) => {
      const usage = this.dailyUsage.find((u) => {
        return u.guid === product.guid;
      });
      const inventory = this.inventory.find((i) => {
        return i.guid === product.guid;
      });

      const newObj = {
        ...product,
      };
      if (usage) newObj.usage = usage.qty;
      if (inventory) newObj.qty = inventory.qty;
      if (inventory && usage) {
        const daysLeft = Math.floor(
          parseInt(inventory.qty) / parseInt(usage.qty)
        );

        /* Create inventory notification if less than 15 days of supply */
        if (daysLeft && daysLeft < 15 && daysLeft > 0) {
          this.notificationsService.createNotification({
            _id: product.guid,
            title: 'Inventory Notification',
            desc: `You've ${daysLeft} days left of the product ${product.Product}, consider ordering before you run out!`,
            action: product.order_url,
            type: 'inventory',
          });
        } else if (daysLeft && daysLeft <= 0) {
          this.notificationsService.createNotification({
            _id: product.guid,
            title: 'Inventory Notification',
            desc: `You've run out of the product ${product.Product}, click here to order!`,
            action: product.order_url,
            type: 'inventory',
          });
        }
        newObj.daysLeft = daysLeft;
      }

      this.displayItems.push(newObj);
    });
  }

  /* Sort items in display */
  sortDisplayItems(selectedKey?: string): void {
    if (selectedKey) {
      this.sortKey = selectedKey;
    }
    const key = this.sortKey;
    this.displayItems.sort((a: any, b: any) => {
      if (a[key] > b[key]) {
        return this.sortDirection == 'asc' ? 1 : -1;
      }
      if (a[key] < b[key]) {
        return this.sortDirection == 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  selectOrder(event: any) {
    this.sortDirection = event.target.value;
    this.sortDisplayItems();
  }

  /* Set badge color depending on product days left */
  setBadgeColor(item: Product) {
    const daysLeft = item.daysLeft!;
    const classes = {
      'badge-success': daysLeft > 10,
      'badge-secondary': daysLeft >= 7 && daysLeft <= 10,
      'badge-danger': daysLeft < 7,
    };
    return classes;
  }
}
