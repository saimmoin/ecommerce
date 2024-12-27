import { NgClass, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-cards',
  standalone: true,
  imports: [NgFor, NgClass, FormsModule],
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.css'
})
  
export class ProductCardsComponent {
  
  constructor(private http: HttpClient) { }
  router = inject(Router);
  products: any[] = [];

    getAllProducts() {
    ;
    this.http.get("http://localhost:8080/api/v1/productsList").subscribe((result:any)=>{
      ;
      this.products = result;
      console.log(result);
    })
  }

  addToCart(product: any) {
    console.log('Product added to cart:', product);
    this.http.post("http://localhost:8080/api/v1/shoppingCarts/add", { userId: 1, productId: product.productId, quantity: prompt("Enter quantity: "), addedAt: new Date(), price: product.price, productName: product.name}, { responseType: 'text' })
      .subscribe((result: any) => {
        alert("Product added to cart successfully");
        this.router.navigate(['/shopping-cart']);
    })
  }

  ngOnInit(): void {
    this.getAllProducts();
  }
}
