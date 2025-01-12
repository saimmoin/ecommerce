import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductCardsComponent } from './components/product-cards/product-cards.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CategoryComponent } from './components/category/category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { CartComponent } from './components/cart/cart.component';
import { UpdateComponent } from './components/update/update.component';
import { CardPaymentComponent } from './components/card-payment/card-payment.component';
import { ServiceComponent } from './components/service/service.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },

    {
        path: 'productsList',
        component: ProductsComponent
    },

    {
        path: 'productCards',
        component: ProductCardsComponent
    },

    {
        path: 'addProduct',
        component: AddProductComponent
    },

    {
        path: 'ordersList',
        component: OrdersComponent
    },

    {
        path: 'categoryList',
        component: CategoryComponent
    },

    {
        path: 'addCategory',
        component: AddCategoryComponent
    },
    {
        path: 'payments',
        component: PaymentsComponent
    },
    {
        path: 'shopping-cart',
        component: CartComponent
    },
    {
        path: 'update',
        component: UpdateComponent
    },
    {
        path: 'card-payment',
        component: CardPaymentComponent
    },
    {
        path: 'services',
        component: ServiceComponent
    }
];
