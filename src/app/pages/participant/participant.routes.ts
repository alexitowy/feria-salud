// app/pages/participant/participant.routes.ts
import { Routes } from '@angular/router'
import { JoinEventComponent } from './join-event/join-event.component'

export const participantRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'join', pathMatch: 'full' },
      { path: 'join', component: JoinEventComponent },
      {
        path: 'await',
        loadComponent: () =>
          import('./waiting-room/waiting-room.component').then((m) => m.WaitingRoomComponent),
      },
      {
        path: 'event',
        loadComponent: () =>
          import('./event-editor/event-editor.component').then((m) => m.EventEditorComponent),
      },
      {
        path: 'thanks',
        loadComponent: () =>
          import('./thank-you/thank-you.component').then((m) => m.ThankYouComponent),
      },
      {
        path: 'stage-waiting',
        loadComponent: () =>
          import('./stage-waiting/stage-waiting.component').then((m) => m.StageWaitingComponent),
      },
      {
        path: 'final-stage',
        loadComponent: () =>
          import('./stage-final-enigma/stage-final-enigma.component').then(
            (m) => m.StageFinalEnigmaComponent
          ),
      },
      { path: '**', redirectTo: 'join', pathMatch: 'full' },
    ],
  },
]

export default participantRoutes
