import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../../core/services/auth.service'
import { StorageService } from '../../../core/services/storage.service'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'
import { filter } from 'rxjs'
import { UtilsService } from '../../../core/services/utils.service'

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
    private storageService: StorageService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.utilsService.clearToast()
    const userData = this.storageService.getData(StorageEnum.USER_DATA)
    if (!userData) {
      this.router.navigate(['/participant/join-event'])
      return
    }

    this.authService.listenIfUserDeleted(userData.username, () => {
      this.router.navigate(['/participant/join'])
    })

    this.authService.eventListener$.pipe(filter(Boolean)).subscribe(async (event) => {
      this.eventData = event

      if (event.nextStageReady) {
        await this.authService.updateCurrentStageAuto()
        this.router.navigate(['/participant/event'])
      }
    })
  }
}
