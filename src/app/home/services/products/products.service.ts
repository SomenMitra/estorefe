import { Injectable } from '@angular/core';
import { Product } from '../../types/products.types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {
  // private baseUrl = 'http://localhost:8085/estore';

  private baseUrl = 'https://estoreapp-aebd8dcaf3bf.herokuapp.com/estore';

  constructor(private httpClient: HttpClient) {}

  getAllProducts(query?: string): Observable<Product[]> {
    let prodUrl: string = this.baseUrl + '/getAllProducts';

    if (query) prodUrl += '?' + query;

    return this.httpClient.get<Product[]>(prodUrl);
  }

  getProductById(id: number): Observable<Product> {
    const url: string = this.baseUrl + '/getProductById/' + id;
    return this.httpClient.get<Product>(url);
  }
}
