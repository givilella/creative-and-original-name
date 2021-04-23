import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly API_URL =
    'https://my-json-server.typicode.com/reversegremlin/testapi';

  loadProducts: Subject<any> = new Subject<any>();
  private _products: Product[] = [];

  get products() {
    return this._products;
  }

  constructor(private readonly http: HttpClient) {}

  loadProductsSuccess() {
    this.loadProducts.next();
  }

  Init(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      try {
        const url = this.API_URL + '/products';
        this.http.get(url).subscribe((data: any) => {
          this._products = Array.from(Object.keys(data), (k) => data[k]);
          this.loadProductsSuccess();
        });
        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getUsage(): Promise<any> {
    const url = this.API_URL + '/daily_usage';
    return this.http.get(url).toPromise();
  }

  getInventory(): Promise<any> {
    const url = this.API_URL + '/inventory';
    return this.http.get(url).toPromise();
  }
}
