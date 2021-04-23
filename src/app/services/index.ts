import { APP_INITIALIZER } from '@angular/core';
import { ChildrenService } from './children.service';
import { ProductsService } from './products.service';

export function initializeProductsService(productsService: ProductsService) {
  return (): Promise<any> => {
    return productsService.Init();
  };
}
export function initializeChildrenService(childrenService: ChildrenService) {
  return (): Promise<any> => {
    return childrenService.Init();
  };
}

export const AppInitializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeProductsService,
    deps: [ProductsService],
    multi: true,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: initializeChildrenService,
    deps: [ChildrenService],
    multi: true,
  },
];
