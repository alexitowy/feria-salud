import { Routes } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'

const organizerRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'await', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'await',
        loadComponent: () =>
          import('./waiting-room/waiting-room.component').then((m) => m.WaitingRoomComponent),
      },
      { path: '**', redirectTo: 'await', pathMatch: 'full' },
    ],
  },
]

export default organizerRoutes
