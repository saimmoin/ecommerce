import { Component, inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {
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
    this.http.get("http://localhost:8080/api/v1/payments").subscribe((result:any)=>{
      ;
      this.rowData = result;
      console.log(result);
    })
  }

  cashOndelivery(params: any) {  
    this.http.post("http://localhost:8080/api/v1/payments/update", { paymentId: params.paymentId, amountReceived: prompt("Enter amount: ")  }, { responseType: 'text' })
      .subscribe(
        response => {
          console.log(response);
          alert("Payment updated successfully");
          window.location.reload();
        },
        error => {
          console.error(error);
          alert("Failed to update payment");
        }
    )
  }

  colDefs: ColDef[] = [
    {field: "paymentId"},
   { field: "orderId" },
    { field: "amount" },
   { field: "paymentMethod" },
   { field: "status" },
    { field: "paidAt" },
    {
  headerName: "Update",
  field: "Update",
  cellRenderer: (params: any) => {
    // Check if the payment method is "cash_on_delivery"
    if (params.data.paymentMethod === 'cash_on_delivery' && params.data.status === 'pending') {
      const button = document.createElement('button');
      button.innerText = 'Update COD';
      button.style.backgroundColor = 'green';
      button.style.color = 'white';
      button.style.fontFamily = 'monospace';
      button.addEventListener('click', () => {
        console.log("Cell clicked:", params.data);
        this.cashOndelivery(params.data);
      });
      return button;
    } else {
      // Return an empty element if the condition is not met
      return document.createElement('span');
    }
  }
}

 ];
}
