import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { CartService } from '../../services/cart.services';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {

  private cartService = inject(CartService);

  cartItems = signal<any[]>([]);


  ngOnInit(): void {

    const userId = Number(
      localStorage.getItem('userId')
    );


    this.cartService
      .getCartItems(userId)
      .subscribe((response: any) => {

        console.log('CART RESPONSE:', response);


        if (response.success) {

          this.cartItems.set(response.data);

          console.log(
            'CART ITEMS:',
            this.cartItems()
          );

        }

      });

  }


  getSubtotal(): number {

    return this.cartItems().reduce(
      (total, item) =>
        total + item.totalPrice,
      0
    );

  }

}