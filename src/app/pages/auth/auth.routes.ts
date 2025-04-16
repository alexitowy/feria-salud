import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const authRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AuthComponent },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

export default authRoutes;
