import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../../core/services/auth.service'
import { StorageService } from '../../../core/services/storage.service'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'
import { filter } from 'rxjs'

@Component({
  selector: 'app-stage-waiting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stage-waiting.component.html',
  styleUrl: './stage-waiting.component.scss',
})
export class StageWaitingComponent {
  waitingMessage = ''
  eventData: any = null

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const userData = this.storageService.getData(StorageEnum.USER_DATA)
    if (!userData) {
      this.router.navigate(['/participant/join-event'])
      return
    }

    // Escuchar evento
    this.authService.eventListener$.pipe(filter(Boolean)).subscribe((event) => {
      this.eventData = event

      // 🚀 Si el organizador lanzó la siguiente etapa
      if (event.nextStageReady) {
        this.router.navigate(['/participant/event'])
      }
    })

    // Escuchar participantes
    this.authService.participantsListener$.pipe(filter(Boolean)).subscribe((participants) => {
      this.updateWaitingMessage(participants)
    })
  }

  updateWaitingMessage(participants: any[]): void {
    if (!this.eventData) {
      this.waitingMessage = 'Por favor espera...'
      return
    }

    const totalPlayers = participants.filter((p) => !p.organizer).length
    const finishedPlayers = participants.filter((p) => !p.organizer && p['1']).length

    const playersRemaining = totalPlayers - finishedPlayers

    if (playersRemaining > 0) {
      this.waitingMessage = `Esperando a ${playersRemaining} jugador${playersRemaining > 1 ? 'es' : ''} más...`
    } else {
      this.waitingMessage = '¡Todos listos! Espera que el organizador continúe.'
    }
  }
}
