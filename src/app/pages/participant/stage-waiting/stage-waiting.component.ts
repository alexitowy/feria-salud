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
  waitingMessage = '¡Todos listos! Espera que el organizador continúe.'
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
    this.authService.listenIfUserDeleted(userData.username, () => {
      this.router.navigate(['/participant/join'])
    })

    // Escuchar evento solo si el usuario existe
    this.authService.eventListener$.pipe(filter(Boolean)).subscribe((event) => {
      this.eventData = event

      if (event.nextStageReady) {
        this.router.navigate(['/participant/event'])
      }
    })
  }
}
