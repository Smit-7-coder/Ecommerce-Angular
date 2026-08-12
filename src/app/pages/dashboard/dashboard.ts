import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ProductService } from '../../services/products.services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private productServices = inject(ProductService);

  products = signal<any[]>([]);

  ngOnInit(): void {

    this.productServices.getProducts().subscribe((response: any) => {

      console.log('API RESPONSE:', response);

      if (response.success) {

        this.products.set(response.data);

        console.log('PRODUCTS ARRAY:', this.products());
        console.log('TOTAL PRODUCTS:', this.products().length);

      }

    });

  }
}