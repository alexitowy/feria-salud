import { CommonModule } from '@angular/common'
import { AfterViewInit, Component } from '@angular/core'
import { Router } from '@angular/router'
import { filter } from 'rxjs'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'
import { Event } from '../../../core/models/event.model'
import { User } from '../../../core/models/user.model'
import { AuthService } from '../../../core/services/auth.service'
import { StorageService } from '../../../core/services/storage.service'
import { StagesData } from '../../participant/event-editor/constants/stages'
import { ImageComponent } from '../../participant/event-editor/components/stage-clinical-cases/components/image/image.component'
import { TextComponent } from '../../participant/event-editor/components/stage-clinical-cases/components/text/text.component'
import { MultipleChoiceComponent } from '../../participant/event-editor/components/stage-clinical-cases/components/multiple-choice/multiple-choice.component'
import { SingleSelectionComponent } from '../../participant/event-editor/components/stage-clinical-cases/components/single-selection/single-selection.component'

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    SingleSelectionComponent,
    MultipleChoiceComponent,
    TextComponent,
    ImageComponent,
  ],
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

  stagesData = StagesData

  accordionOpen: Record<number, boolean> = {}
  currentSlide: Record<number, number> = {}

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
      this.router.navigate(['/organizer/await'])
    } catch (error) {
      console.error('Error al reiniciar el juego:', error)
    }
  }

  getStageKeys(): number[] {
    return Object.keys(this.stagesData).map(Number)
  }

  toggleAccordion(stageKey: number): void {
    this.accordionOpen[stageKey] = !this.accordionOpen[stageKey]
    // inicializa slide si no existe
    if (!(stageKey in this.currentSlide)) this.currentSlide[stageKey] = 0
  }

  isAccordionOpen(stageKey: number): boolean {
    return this.accordionOpen[stageKey] || false
  }

  nextSlide(stageKey: number, total: number): void {
    if (this.currentSlide[stageKey] < total - 1) this.currentSlide[stageKey]++
  }

  prevSlide(stageKey: number): void {
    if (this.currentSlide[stageKey] > 0) this.currentSlide[stageKey]--
  }
}
