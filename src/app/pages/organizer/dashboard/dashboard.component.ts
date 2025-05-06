import { AfterViewInit, Component } from '@angular/core'
import { User } from '../../../core/models/user.model'
import { Router } from '@angular/router'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'
import { AuthService } from '../../../core/services/auth.service'
import { StorageService } from '../../../core/services/storage.service'
import { Event } from '../../../core/models/event.model'
import { NgFor, NgIf } from '@angular/common'
import { filter } from 'rxjs'

@Component({
  selector: 'app-dashboard',
  imports: [NgIf, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit {
  private video!: HTMLVideoElement
  user!: User
  event!: Event
  participants: any[] = []
  isOpen = false
  answer = ''
  math = Math
  allPlayersReady = false
  playersRemaining = 0
  loadingNextStage = false
  currentStage = 1
  showRestartModal = false

  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService
  ) {
    this.user = this.storageService.getData(StorageEnum.USER_DATA) as User
    if (!this.user) {
      this.router.navigate(['/organizer/await'])
      return
    }
    this.authService.eventListener$.subscribe((event) => {
      this.event = event
    })
    this.authService.participantsListener$.pipe(filter(Boolean)).subscribe((participants) => {
      this.participants = participants.map((p: any) => ({
        ...p,
        avatar: `assets/images/avatars_${Math.floor(Math.random() * 9) + 1}.png`,
      }))

      const stages = participants
        .filter((p: any) => !p.organizer && p.currentStage)
        .map((p: any) => p.currentStage)

      this.currentStage = stages.length > 0 ? Math.max(...stages) : 1 // 🚀
    })

    this.authService.getEvent()
    this.authService.getParticipants()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.video = document.querySelector('video') as HTMLVideoElement
    }, 1000)
  }

  startVideo() {
    if (this.video) {
      this.video.play()
    }
  }

  pauseVideo() {
    if (this.video) {
      this.video.pause()
    }
  }

  async continue() {
    await this.authService.completedVideoIntro()
  }

  async continueToNextStage(): Promise<void> {
    this.loadingNextStage = true
    await this.authService.launchNextStage()
    await this.authService.resetNextStageReady()
    this.loadingNextStage = false
  }

  openRestartModal(): void {
    this.showRestartModal = true
  }

  closeRestartModal(): void {
    this.showRestartModal = false
  }

  async confirmRestartGame(): Promise<void> {
    this.showRestartModal = false
    try {
      await this.authService.clearParticipants()
      await this.authService.updateEventState({
        active: false,
        introVideoCompleted: false,
      })
      this.participants = []
    } catch (error) {
      console.error('Error al reiniciar el juego:', error)
    }
  }
}
