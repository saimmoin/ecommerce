import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common'; 


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class AddProductComponent implements OnInit {
  router = inject(Router);
  private route = inject(ActivatedRoute); // Inject ActivatedRoute to access route parameters
  http = inject(HttpClient);

  categories: any[] = [];
  productId: string | null = null; // To hold the product ID

  name: string = '';
  price: number = 0;
  description: string = '';
  imageUrl: string = '';
  categoryId: number = 0;
  stock: number = 0;
  createdAt: string = '';



   ngOnInit(): void {
    this.getAllCategories();
    // Capture the product ID from the query parameters
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('id'); // Capture the ID from the query parameters
      console.log('Product ID:', this.productId); // Log the product ID to the console
      if (this.productId) {
        this.http.get("http://localhost:8080/api/v1/products/" + this.productId).subscribe((result: any) => {
          console.log(result);
          this.name = result.name;
          this.price = result.price;
          this.description = result.description;
          this.imageUrl = result.imageUrl;
          this.categoryId = result.categoryId;
          this.stock = result.stock;
          this.createdAt = formatDate(result.createdAt, 'yyyy-MM-dd', 'en');
        });
      }
    });
  }

  getAllCategories() {
    this.http.get("http://localhost:8080/api/v1/categories/dropDown").subscribe((result: any) => {
      this.categories = result;
      console.log(result);
    });
  }

  onSubmit(productForm: NgForm) {
    console.log('Form Data:', productForm.value);
    this.http.post("http://localhost:8080/api/v1/products/add", productForm.value, { responseType: 'text' })
      .subscribe((result: any) => {
        alert("Product Added Successfully");
        this.router.navigateByUrl('productsList');
      }, error => {
        alert("Something went wrong");
      });
  }


update(productForm: NgForm) {
      console.log('Form Data:', productForm.value);
    this.http.put("http://localhost:8080/api/v1/products/" + this.productId, productForm.value, { responseType: 'text' })
      .subscribe((result: any) => {
        alert("Product Updated Successfully");
        this.router.navigateByUrl('productsList');
      }, error => {
        alert("Something went wrong");
      });
}

}