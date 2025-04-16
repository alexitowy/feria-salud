import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const organizerRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'evento',
        loadComponent: () =>
          import('./event-editor/event-editor.component').then(
            (m) => m.EventEditorComponent
          ),
      },
      {
        path: 'en-vivo',
        loadComponent: () =>
          import('./live-event/live-event.component').then(
            (m) => m.LiveEventComponent
          ),
      },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

export default organizerRoutes;
