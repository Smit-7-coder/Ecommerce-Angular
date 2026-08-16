import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5282/api/Cart';


  // =========================================================
  // ADD TO CART
  // =========================================================

  addToCart(
    userId: number,
    productId: number,
    quantity: number
  ): Observable<any> {

    const request = {
      userId: userId,
      productId: productId,
      quantity: quantity
    };

    return this.http.post<any>(
      `${this.apiUrl}/AddToCart`,
      request
    );
  }


  // =========================================================
  // GET CART ITEMS
  // =========================================================

  getCartItems(userId: number): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/GetCartItems?userId=${userId}`
    );
  }

}