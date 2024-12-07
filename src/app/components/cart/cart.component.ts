import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [AgGridAngular, NgFor, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
constructor(private http: HttpClient) {}
   router = inject(Router);

  rowData : any = [];
   isModalOpen: boolean = false;

  pagination: boolean = true;
  paginationPageSize: any;
  paginationPageSizeSelector: any;


  ngOnInit() {
    this.getAllCategories();
    
    this.paginationPageSize = 10;
  this.paginationPageSizeSelector = [10, 20, 50];
  }

  getAllCategories() {
    ;
    this.http.get("http://localhost:8080/api/v1/shoppingCarts").subscribe((result:any)=>{
      ;
      this.rowData = result;
      console.log(result);
    })
    console.log(this.rowData)
  }

  colDefs: ColDef[] = [
    {field: "cartId"},
    { field: "userId" },
   {field: "productId"},
    { field: "quantity" },
    { field: "addedAt" },
    { field: "price" },
    {field: "productName"},
    {
  headerName: "Remove",
  field: "remove",
  cellRenderer: (params: any) => {
    const button = document.createElement('button');
    button.innerText = '🗑️';
    button.style.backgroundColor = 'red';
    button.addEventListener('click', () => {
      console.log("Cell clicked:", params.data);
      this.http.get("http://localhost:8080/api/v1/shoppingCarts/delete/" + params.data.cartId, { responseType: 'text' })
        .subscribe(
          (result: any) => {
            console.log("Product removed from cart:", result);
            alert(result); // Displays the plain text response
            window.location.reload();
          },
          (error: any) => {
            console.error("Error occurred while removing product:", error);
            alert("Failed to remove product from cart");
          }
        );
    });
    return button;
  }
}


  ];
  
   openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    // Calculate total price
calculateTotalPrice(): number {
        return this.rowData.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
    }

  checkout() {
    alert("Checkout Successfull")
  }

}
