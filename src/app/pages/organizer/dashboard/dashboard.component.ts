import { CommonModule } from '@angular/common'
import { AfterViewInit, Component } from '@angular/core'
import { Router } from '@angular/router'
import { filter, Subscription } from 'rxjs'
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
import { AntibioticSelectorComponent } from '../../participant/event-editor/components/antibiotic-selector/antibiotic-selector.component'

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    SingleSelectionComponent,
    MultipleChoiceComponent,
    TextComponent,
    ImageComponent,
    AntibioticSelectorComponent,
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
  showRestartModal = false

  stagesData = structuredClone(StagesData)

  openStageKey: number | null = null

  currentSlide: Record<number, number> = {}

  showWinnerModal = false
  winnerPlayer: any = null

  private participantsSub!: Subscription
  private eventSub!: Subscription
  private stageWinnerSub!: Subscription

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
    this.eventSub = this.authService.eventListener$.subscribe((event) => {
      this.event = event
    })
    this.participantsSub = this.authService.participantsListener$
      .pipe(filter(Boolean))
      .subscribe((participants: any[]) => {
        this.participants = participants.sort((a, b) => (b.points || 0) - (a.points || 0))
      })

    this.stageWinnerSub = this.authService.participantsListener$
      .pipe(filter(Boolean))
      .subscribe(async (participants: any[]) => {
        const completed = participants.find((p) => p['8'] === true)
        const topScorer = participants.reduce((max, p) => {
          return (p.points || 0) > (max.points || 0) ? p : max
        }, participants[0])
        if (completed && !this.winnerPlayer) {
          this.showWinnerModal = true
          this.winnerPlayer = {
            name: topScorer.name,
            points: topScorer.points,
          }
        }
      })

    this.authService.getEvent()
    this.authService.getParticipants()
    this.stagesData = {
      ...this.stagesData,
      8: {
        name: 'Final',
        dashboard: {
          video: 'assets/videos/final.mov',
        },
      },
    }
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
    setTimeout(async () => {
      await this.authService.resetNextStageReady()
      this.loadingNextStage = false
    }, 1000)
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
        finish: false,
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
    this.openStageKey = this.openStageKey === stageKey ? null : stageKey
    if (!(stageKey in this.currentSlide)) this.currentSlide[stageKey] = 0
  }

  isAccordionOpen(stageKey: number): boolean {
    return this.openStageKey === stageKey
  }

  nextSlide(stageKey: number, total: number): void {
    if (this.currentSlide[stageKey] < total - 1) this.currentSlide[stageKey]++
  }

  prevSlide(stageKey: number): void {
    if (this.currentSlide[stageKey] > 0) this.currentSlide[stageKey]--
  }

  ngOnDestroy(): void {
    this.participantsSub?.unsubscribe()
    this.eventSub?.unsubscribe()
    this.stageWinnerSub?.unsubscribe()
  }

  closeWinnerModal() {
    this.showWinnerModal = false
  }
}
