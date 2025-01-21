import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartStoreItem } from '../cart/cart.storeItem';
import { Order, OrderItem } from '../../types/order.type';
import { DeliveryAddress } from '../../types/cart.type';
import { UserService } from '../users/user.service';
import { PastOrder, PastOrderProduct } from '../../types/order.type';

@Injectable()
export class OrderService {
  constructor(
    private httpClient: HttpClient,
    private cartStore: CartStoreItem,
    private userservice: UserService
  ) {}

  // private baseUrl = 'http://localhost:8085/orders';

  private baseUrl = 'https://estoreapp-aebd8dcaf3bf.herokuapp.com/orders';

  saveOrder(
    deliveryAddress: DeliveryAddress,
    userEmail: string
  ): Observable<any> {
    const url: string = this.baseUrl + '/add';

    const orderDetails: OrderItem[] = [];

    this.cartStore.cart.products.forEach((product) => {
      const orderItem: OrderItem = {
        productId: product.product.id,
        price: product.product.price,
        qty: product.quantity,
        amount: product.amount,
      };
      orderDetails.push(orderItem);
    });

    const order: Order = {
      userName: deliveryAddress.userName,
      address: deliveryAddress.address,
      city: deliveryAddress.city,
      state: deliveryAddress.state,
      pin: deliveryAddress.pin,
      total: this.cartStore.cart.totalAmount,
      userEmail: userEmail,
      orderDetails: orderDetails,
    };

    return this.httpClient.post(url, order, {
      headers: {
        authorization: `Bearer ${this.userservice.token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  getOrders(userEmail: string): Observable<PastOrder[]> {
    const url: string = this.baseUrl + `/allOrders?userEmail=${userEmail}`;

    return this.httpClient.get<PastOrder[]>(url, {
      headers: {
        authorization: `Bearer ${this.userservice.token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  getOrderProducts(orderId: number): Observable<PastOrderProduct[]> {
    const url: string = this.baseUrl + `/orderProducts?orderId=${orderId}`;

    return this.httpClient.get<PastOrderProduct[]>(url, {
      headers: {
        authorization: `Bearer ${this.userservice.token}`,
        'Content-Type': 'application/json',
      },
    });
  }
}
