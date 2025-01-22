import { Component } from '@angular/core';
import { HeaderComponent } from './components/navbar_components/header/header.component';
import { CatnavigationComponent } from './components/navbar_components/catnavigation/catnavigation.component';
import { SidenavComponent } from './components/sidenav_component/sidenav/sidenav.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { CategoryService } from './services/category/category.service';
import { ProductStoreItem } from './services/products/products.storeItems';
import { ProductsService } from './services/products/products.service';
import { SearchKeyword } from './types/searchKeyword.types';
import { NavigationEnd, RouterModule, Router } from '@angular/router';
import { CartStoreItem } from './services/cart/cart.storeItem';
import { filter } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/users/user.service';
import { OrderService } from './services/order/order.service';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CatnavigationComponent,
    RouterModule,
    ReactiveFormsModule,
    FooterComponent,
  ],
  providers: [
    CategoryService,
    CategoriesStoreItem,
    ProductsService,
    ProductStoreItem,
    CartStoreItem,
    UserService,
    OrderService,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private categoriesStoreItem: CategoriesStoreItem,
    private productStoreItem: ProductStoreItem,
    private router: Router
  ) {
    this.productStoreItem.loadProducts();
    this.categoriesStoreItem.loadCategories();
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if ((event as NavigationEnd).url === '/home') {
          router.navigate(['/home/products']);
        }
      });
  }

  onSelectSubCategory(subCategoryId: number): void {
    this.productStoreItem.loadProducts('subcategoryid=' + subCategoryId);
  }

  onSelectCategory(categoryId: number): void {
    this.productStoreItem.loadProducts('maincategoryid=' + categoryId);
  }

  onSearchKeyword(searchKeyword: SearchKeyword): void {
    this.productStoreItem.loadProducts(
      'maincategoryid=' +
        searchKeyword.categoryId +
        '&keyword=' +
        searchKeyword.keyword
    );
  }
}
