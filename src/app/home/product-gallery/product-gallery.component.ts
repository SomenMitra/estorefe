import { Component } from '@angular/core';
import { ProductStoreItem } from '../services/products/products.storeItems';
import { SidenavComponent } from '../components/sidenav_component/sidenav/sidenav.component';
import { ProductsComponent } from '../components/products/products.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [SidenavComponent, ProductsComponent, CommonModule, FooterComponent],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss',
})
export class ProductGalleryComponent {
  isSideNavCollapsed = false;

  constructor(private productStoreItem: ProductStoreItem) {}

  toggleSideNav(): void {
    this.isSideNavCollapsed = !this.isSideNavCollapsed;
  }

  onSelectSubCategory(subCategoryId: number): void {
    this.productStoreItem.loadProducts('subcategoryid=' + subCategoryId);
  }
}
