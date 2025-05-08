import { Component, Input, OnInit } from '@angular/core'
import { MultipleChoiceComponent } from './components/multiple-choice/multiple-choice.component'
import { SingleSelectionComponent } from './components/single-selection/single-selection.component'
import { TextComponent } from './components/text/text.component'
import { ImageComponent } from './components/image/image.component'
import { StorageService } from '../../../../../core/services/storage.service'
import { AuthService } from '../../../../../core/services/auth.service'
import { Router } from '@angular/router'
import { UtilsService } from '../../../../../core/services/utils.service'
import { CommonModule } from '@angular/common'
import { ModalFeedbackComponent } from './components/modal-feedback/modal-feedback.component'

@Component({
  selector: 'app-stage-clinical-cases',
  imports: [
    SingleSelectionComponent,
    MultipleChoiceComponent,
    TextComponent,
    ImageComponent,
    CommonModule,
    ModalFeedbackComponent,
  ],
  templateUrl: './stage-clinical-cases.component.html',
  styleUrl: './stage-clinical-cases.component.scss',
})
export class StageClinicalCasesComponent implements OnInit {
  @Input() stageData: any = null
  @Input() currentStage!: number

  currentQuestion: any
  isLastQuestion: boolean = false
  isEnd: boolean = false
  showAwardModal = false
  points: number = 0

  constructor(
    private localStorageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private utils: UtilsService
  ) {}
  ngOnInit(): void {
    this.currentQuestion = this.stageData.questions[0]
  }

  nextQuestion(totalTimeLeft: number): void {
    this.updatePoints(totalTimeLeft)
    const currentIndex = this.stageData.questions.indexOf(this.currentQuestion)
    this.currentQuestion = null
    setTimeout(() => {
      this.isLastQuestion = currentIndex === this.stageData.questions.length - 1
      if (currentIndex < this.stageData.questions.length - 1) {
        this.currentQuestion = this.stageData.questions[currentIndex + 1]
      } else if (this.isLastQuestion) {
        this.isEnd = true
      }
    }, 1000)
  }

  submit(): void {
    const award = this.stageData?.viewResults?.award

    if (award) {
      this.showAwardModal = true
      const awards = this.localStorageService.getData('award') || []
      awards.push(award)
      this.localStorageService.setData('award', awards)
    }
  }

  async closeAwardModal(): Promise<void> {
    this.showAwardModal = false

    this.router.navigate(['/participant/stage-waiting'])
    await this.authService.finishStage(this.currentStage.toString(), this.points)
  }

  timeUp(): void {
    this.nextQuestion(-1)
  }

  updatePoints(totalTimeLeft: number): void {
    if (totalTimeLeft === -1) {
      this.points += 0
      return
    }

    this.points += this.utils.calculateScore(
      2,
      this.currentQuestion.points,
      this.currentQuestion.timeLeft,
      totalTimeLeft
    )
  }
}
