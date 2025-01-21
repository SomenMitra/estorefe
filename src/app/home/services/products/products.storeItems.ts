import { Observable } from 'rxjs';
import { StoreItem } from '../../../shared/sharedItem';
import { Product } from '../../types/products.types';
import { ProductsService } from './products.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductStoreItem extends StoreItem<Product[]> {
  constructor(private productService: ProductsService) {
    super([]);
  }

  async loadProducts(query?: string) {
    this.productService.getAllProducts(query).subscribe((product) => {
      this.setValue(product);
    });
  }

  get products$(): Observable<Product[]> {
    return this.value$;
  }

  get products(): Product[]{
    return this.value;
  }
}
