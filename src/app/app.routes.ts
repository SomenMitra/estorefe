import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './home/components/product-details/product-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductGalleryComponent } from './home/product-gallery/product-gallery.component';
import { CartComponent } from './home/components/cart/cart.component';
import { UserSignupComponent } from './home/components/users/user-signup/user-signup.component';
import { UserLoginComponent } from './home/components/users/user-login/user-login.component';
import { PastordersComponent } from './home/components/pastorders/pastorders.component';
import { authGuard } from './home/services/authguard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'products', component: ProductGalleryComponent },
      { path: 'products/details/:id', component: ProductDetailsComponent },
      { path: 'products/cart', component: CartComponent },
      { path: 'signup', component: UserSignupComponent },
      { path: 'login', component: UserLoginComponent },
      {
        path: 'products/pastorders',
        component: PastordersComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: '', redirectTo: '/home/products', pathMatch: 'full' },
  { path: 'home', redirectTo: '/home/products', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
