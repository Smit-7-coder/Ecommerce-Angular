import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Product } from './pages/product/product';
import { ChangePassword } from './pages/change-password/change-password';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: '',
    component: Layout,
    children: [

      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'product',
        component: Product
      },
      {
        path: 'change-password',
        component: ChangePassword
      }

    ]
  }

];