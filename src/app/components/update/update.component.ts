import { Router, ActivatedRoute  } from '@angular/router';
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {

  constructor(private cdr: ChangeDetectorRef) {}

  router = inject(Router);
  private route = inject(ActivatedRoute); 
  http = inject(HttpClient);

  orderId: string | null = null;
  username: string = '';
  totalAmount: number = 0;
  status: string = '';
  orders: any[] = [];

  remarks: string = '';

  isModalOpen: boolean = false;
  isModalOpens: boolean = false;
  paymentMethods: string[] = ['credit_card', 'paypal', 'crypto', 'cash_on_delivery'];
  selectedPaymentMethod: string = 'credit_card'; // Default selection
  

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.orderId = params.get('id');
      this.fetchOrderDetails();
    });
  }

  fetchOrderDetails() {
    this.http
      .get(`http://localhost:8080/api/v1/orders/${this.orderId}`)
      .subscribe(
        (result: any) => {
          this.username = result.userInfo.name;
          this.totalAmount = result.totalAmount;
          this.status = result.status;
          this.orders = result.orderItems;
        },
        (error) => {
          console.error('Error fetching order details:', error);
        }
      );
  }

  openModal() {
      console.log("inside modal")
       this.isModalOpen = true;
       this.cdr.detectChanges();
    }

    closeModal() {
      this.isModalOpen = false;
      this.cdr.detectChanges();
  }
  
    openModals() {
       this.isModalOpens = true;
       this.cdr.detectChanges();
    }

    closeModals() {
      this.isModalOpens = false;
      this.cdr.detectChanges();
    }

  cancelOrder() {
    this.http.post("http://localhost:8080/api/v1/orders/update", { orderId: this.orderId, status: "cancelled", remarks: this.remarks }, { responseType: 'text' })
      .subscribe(
        response => {
          console.log(response);
          alert("Order updated successfully");
          window.location.reload();
        },
        error => {
          console.error(error);
          alert("Failed to update order");
        }
    )
  }



   shippedOrder() {
    this.http.post("http://localhost:8080/api/v1/orders/update", { orderId: this.orderId, status: "shipped", remarks: 'Order shipped' }, { responseType: 'text' })
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error(error);
          alert("Failed to update order");
        }
    )
  }


  checkout() {
    if (this.selectedPaymentMethod === 'credit_card' || this.selectedPaymentMethod === 'paypal') {
      this.router.navigate(['/card-payment'], { queryParams: { orderId: this.orderId, amount: this.totalAmount, paymentMethod: this.selectedPaymentMethod} });
     }
    else {
      this.http.post("http://localhost:8080/api/v1/payments/add", { orderId: this.orderId, amount: this.totalAmount, paymentMethod: this.selectedPaymentMethod, status: "pending", paidAt: new Date() }, { responseType: 'text' })
        .subscribe(
          response => {
            alert("Payment added successfully");
            this.shippedOrder();
            this.router.navigate(['/ordersList']);
          },
          error => {
            console.error(error);
            alert("Failed to update order");
          }
      )
    }
  }

}