import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { ProductService } from '../../services/products.services';
import { CartService } from '../../services/cart.services';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private productServices = inject(ProductService);
  private cartService = inject(CartService);

  products = signal<any[]>([]);

  ngOnInit(): void {

    this.productServices.getProducts().subscribe((response: any) => {

      if (response.success) {

        this.products.set(response.data);

      }

    });

  }

  addToCart(productId: number, quantity: number): void {

    const userId = Number(localStorage.getItem('userId'));

    this.cartService
      .addToCart(userId, productId, quantity)
      .subscribe((response: any) => {

        console.log('Product added to cart:', response);

        if (response.success) {

          alert('Product added to cart successfully!');

        }
        else {

          alert(response.message);

        }

      });

  }

} 