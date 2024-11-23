import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
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
    this.http.get("http://localhost:8080/api/v1/categories").subscribe((result:any)=>{
      ;
      this.rowData = result;
      console.log(result);
    })
  }

  colDefs: ColDef[] = [
    {field: "categoryId", onCellClicked: (event) => {
        this.router.navigate(['/addCategory'], { queryParams: { id: event.data.categoryId } }); // Updated to use queryParams
   },},
   { field: "name" }
 ];
}
