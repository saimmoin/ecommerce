import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

router = inject(Router);
  private route = inject(ActivatedRoute); // Inject ActivatedRoute to access route parameters
  http = inject(HttpClient);
  name: string = '';

    categoryId: string | null = null; // To hold the product ID

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.categoryId = params.get('id'); // Capture the ID from the query parameters
      console.log('Product ID:', this.categoryId); // Log the product ID to the console
      if (this.categoryId) {
        this.http.get("http://localhost:8080/api/v1/categories/" + this.categoryId).subscribe((result: any) => {
          console.log(result);
          this.name = result.name;
        });
      }
    });
  }
  


  onSubmit(categoryForm: NgForm) {
    console.log('Form Data:', categoryForm.value);
    this.http.post("http://localhost:8080/api/v1/categories/add", categoryForm.value, { responseType: 'text' })
      .subscribe((result: any) => {
        alert("Category Added Successfully");
        this.router.navigateByUrl('categoryList');
      }, error => {
        alert("Something went wrong");
      });
  }

  update(categoryForm: NgForm) {
      console.log('Form Data:', categoryForm.value);
    this.http.put("http://localhost:8080/api/v1/categories/" + this.categoryId, categoryForm.value, { responseType: 'text' })
      .subscribe((result: any) => {
        alert("Category Updated Successfully");
        this.router.navigateByUrl('categoryList');
      }, error => {
        alert("Something went wrong");
      });
}
}
