import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Child } from 'src/app/interfaces/child';
import { Product } from 'src/app/interfaces/product';
import { ChildrenService } from 'src/app/services/children.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
})
export class ChildrenComponent implements OnInit {
  products: Product[] = [];
  child: Child | undefined;
  productsUsed: any[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly childrenService: ChildrenService,
    private readonly productsService: ProductsService
  ) {
    this.productsService.loadProducts.subscribe(() => {
      this.products = this.productsService.products;
      this.getChildById();
    });
    this.childrenService.loadChildren.subscribe(() => {
      this.getChildById();
    });

    this.route.params.subscribe(() => {
      this.getChildById();
      this.products = this.productsService.products;
    });
  }

  ngOnInit(): void {
    this.getChildById();

    this.products = this.productsService.products;
  }

  /* Find Child by the id */
  getChildById(): void {
    this.productsUsed = [];
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.child = this.childrenService.getChildById(parseInt(id));
      /* If child found */
      if (this.child) {
        const guidsUsed: string[] = [];
        this.products = this.productsService.products;
        this.child.products.forEach((guid) => {
          const product = this.products.find((p) => {
            return p.guid === guid;
          });
          if (product && !guidsUsed.includes(guid)) {
            guidsUsed.push(guid);
            this.productsUsed.push(product);
          }
        });
      }
    }
  }

  formatDate(date: string): string {
    return this.childrenService.formatDate(date);
  }
}
