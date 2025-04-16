// app/pages/participant/participant.routes.ts
import { Routes } from '@angular/router';
import { JoinEventComponent } from './join-event/join-event.component';

export const participantRoutes: Routes = [
    {
      path: '',
      children: [
        { path: '', redirectTo: 'unirse', pathMatch: 'full' },
        { path: 'unirse', component: JoinEventComponent },
        { path: 'espera', loadComponent: () => import('./waiting-room/waiting-room.component').then(m => m.WaitingRoomComponent) },
        { path: 'pregunta', loadComponent: () => import('./question/question.component').then(m => m.QuestionComponent) },
        { path: 'gracias', loadComponent: () => import('./thank-you/thank-you.component').then(m => m.ThankYouComponent) },
        { path: '**', redirectTo: 'unirse', pathMatch: 'full' },
      ],
    }
  ];
  
  export default participantRoutes;
