import { Component } from '@angular/core';
import { ProductStoreItem } from '../services/products/products.storeItems';
import { SidenavComponent } from '../components/sidenav_component/sidenav/sidenav.component';
import { ProductsComponent } from '../components/products/products.component';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [SidenavComponent,ProductsComponent],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss',
})
export class ProductGalleryComponent {
  constructor(private productStoreItem: ProductStoreItem) {}

  onSelectSubCategory(subCategoryId: number): void {
    this.productStoreItem.loadProducts('subcategoryid=' + subCategoryId);
  }
}
