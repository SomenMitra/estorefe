import { Component } from '@angular/core';
import { ProductStoreItem } from '../../services/products/products.storeItems';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../types/products.types';
import { CartStoreItem } from '../../services/cart/cart.storeItem';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, SharedModule,RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  faShoppingCart = faShoppingCart;
  constructor(public productStore: ProductStoreItem, private cart: CartStoreItem) {}


  addToCart(product:Product){
    this.cart.addProduct(product);
  }

}
