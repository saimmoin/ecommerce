import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
constructor(private http: HttpClient) {}
   router = inject(Router);

  rowData = [];

  pagination: boolean = true;
  paginationPageSize: any;
  paginationPageSizeSelector: any;


  ngOnInit() {
    this.getAllOrders();
    
    this.paginationPageSize = 10;
  this.paginationPageSizeSelector = [10, 20, 50];
  }

  getAllOrders() {
    ;
    this.http.get("http://localhost:8080/api/v1/orders").subscribe((result:any)=>{
      ;
      this.rowData = result;
      console.log(result);
    })
  }

  colDefs: ColDef[] = [
    {field: "orderId"},
   { field: "name" },
   { field: "totalAmount" },
   { field: "status" },
    { field: "createdAt" },
       {
  headerName: "Update",
  field: "Update",
  cellRenderer: (params: any) => {
    const button = document.createElement('button');
    button.innerText = 'Update Status';
    button.style.backgroundColor = 'green';
    button.style.color = 'white';
    button.style.fontFamily = 'monospace';
    button.addEventListener('click', () => {
    console.log("Cell clicked:", params.data);
      this.router.navigate(['/update'], { queryParams: { id: params.data.orderId } });
    });
    return button;
  }
}
 ];
}
