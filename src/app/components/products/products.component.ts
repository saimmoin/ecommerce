import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(private http: HttpClient) {}
   router = inject(Router);

  rowData = [];

  pagination: boolean = true;
  paginationPageSize: any;
  paginationPageSizeSelector: any;


  ngOnInit() {
    this.getAllProducts();
    
    this.paginationPageSize = 10;
  this.paginationPageSizeSelector = [10, 20, 50];
  }

  getAllProducts() {
    ;
    this.http.get("http://localhost:8080/api/v1/productsList").subscribe((result:any)=>{
      ;
      this.rowData = result;
    })
  }

 // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
   {field: "productId", onCellClicked: (event) => {
        this.router.navigate(['/addProduct'], { queryParams: { id: event.data.productId } }); // Updated to use queryParams
   },},
   { field: "name" },
   { field: "category" },
   { field: "price" },
   { field: "stock" },
   { field: "description" },
   { field: "createdAt" },
 ];
}
