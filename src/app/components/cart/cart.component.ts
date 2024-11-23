import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
constructor(private http: HttpClient) {}
   router = inject(Router);

  rowData = [];

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
  }

  colDefs: ColDef[] = [
    {field: "cartId"},
    { field: "userId" },
   {field: "productId"},
    { field: "quantity" },
    {field: "addedAt"}
 ];
}
