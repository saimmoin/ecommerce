import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.css']
})
export class CardPaymentComponent implements OnInit {
  stripe!: Stripe;
  cardElement: any;
  
  orderId: string | null = null;
  amount: number = 0;
  paymentMethod: string | null = null;
  paymentId: string | null = null;

  router = inject(Router);
  private route = inject(ActivatedRoute); 
  http = inject(HttpClient);

  async ngOnInit() {

  this.route.queryParamMap.subscribe((params) => {
    this.orderId = params.get('orderId');
    this.amount = parseInt(params.get('amount') || '0');
    this.paymentMethod = params.get('paymentMethod');
      
    });


    const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
    if (stripe) {
      this.stripe = stripe;
      const elements = this.stripe.elements();
      this.cardElement = elements.create('card');
      this.cardElement.mount('#card-element');
    } else {
      console.error('Stripe failed to load.');
    }
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
creditCardPayment() {
  // Fetch the payment ID using the order ID
  const url = `http://localhost:8080/api/v1/byOrderId/${this.orderId}`;
  this.http.get(url).subscribe(
    (result: any) => {
      this.paymentId = result; // Assuming the response has a paymentId property
      console.log("Fetched paymentId:", this.paymentId); // Check if the paymentId is correctly fetched

      // Proceed with the next API call only after paymentId is set
      if (this.paymentId) {
        this.http.post("http://localhost:8080/api/v1/payments/update", { paymentId: this.paymentId, amountReceived: this.amount  }, { responseType: 'text' })
          .subscribe(
            response => {
              console.log("Payment updated:", response);
              this.shippedOrder();
            },
            error => {
              console.error("Error updating payment:", error);
              alert("Failed to update credit card payment");
            }
          );
      } else {
        console.error("Payment ID is null");
        alert("Payment ID is null. Cannot update payment.");
      }
    },
    (error) => {
      console.error('Error fetching payment info:', error);
      alert('Failed to fetch payment info');
    }
  );
}


  async submitPayment() {
    const { error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement
    });
    if (error) {
      this.http.post("http://localhost:8080/api/v1/payments/add", { orderId: this.orderId, amount: this.amount, paymentMethod: this.paymentMethod, status: "failed", paidAt: new Date() }, { responseType: 'text' })
        .subscribe(
          response => {
            alert("Payment failed");
            this.router.navigate(['/payments']);
          },
          error => {
            console.error(error);
            alert("Failed to update order");
          }
      )
    } else {
      this.http.post("http://localhost:8080/api/v1/payments/add", { orderId: this.orderId, amount: this.amount, paymentMethod: this.paymentMethod, status: "completed", paidAt: new Date() }, { responseType: 'text' })
        .subscribe(
          response => {
            alert("Payment added successfully");
            this.creditCardPayment();
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