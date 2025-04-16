import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'participant',
    loadChildren: () => import('./pages/participant/participant.routes'),
  },
  {
    path: 'organizer',
    loadChildren: () => import('./pages/organizer/organizer.routes'),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes'),
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
]
