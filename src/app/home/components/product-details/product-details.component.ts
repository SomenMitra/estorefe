import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Product } from '../../types/products.types';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [SharedModule, FontAwesomeModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product;

  faShoppingCart = faShoppingCart;

  subscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private cart: CartStoreItem
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.subscription.add(
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (error) => {
          console.error('Error fetching product:', error);
        },
      })
    );
  }

  addToCart() {
    this.cart.addProduct(this.product);

    Swal.fire({
      title: 'Added to Cart',
      text: `${this.product.product_name} has been added to your cart.`,
      icon: 'success',
      timer: 2000, // Automatically close after 2 seconds
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
