import { Routes } from '@angular/router'

export const routes: Routes = [
  { path: '', redirectTo: 'participant', pathMatch: 'full' },
  {
    path: 'participant',
    loadChildren: () => import('./pages/participant/participant.routes'),
  },
  {
    path: 'organizer',
    loadChildren: () => import('./pages/organizer/organizer.routes'),
  },
  { path: '**', redirectTo: 'participant', pathMatch: 'full' },
]
