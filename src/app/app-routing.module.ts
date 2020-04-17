import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductPageComponent } from './views/product-page/product-page.component';
import { ShopComponent } from './views/shop/shop.component';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { AccountComponent } from './views/account/account.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AdminAuthGaurd } from './services/adminauthgaurd.service';


const routes: Routes = [
  { path: '', 
    component: HomeComponent 
  },
  { path: 'home', 
    component: HomeComponent,
    data: {routeAnimation: 1 }
  },
  { path: 'shop', 
    component: ShopComponent,
    data: {routeAnimation: 2 }
  },
  { path: 'product/:sku', 
    component: ProductPageComponent,
    data: { animation: 'Product'}
  },
  { path: 'about', 
    component: AboutComponent,
    data: { animation: 'About'}
  },
  { path: 'account/:uid', 
    component: AccountComponent
  },
  { path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [ AdminAuthGaurd ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
export const routingComponents = [
  AboutComponent,
  AccountComponent,
  DashboardComponent,
  HomeComponent,
  ShopComponent,
  ProductPageComponent
]