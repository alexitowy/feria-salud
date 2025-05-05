import { Component, Input, OnInit } from '@angular/core'
import { MultipleChoiceComponent } from './components/multiple-choice/multiple-choice.component'
import { SingleSelectionComponent } from './components/single-selection/single-selection.component'
import { TextComponent } from './components/text/text.component'
import { ImageComponent } from './components/image/image.component'
import { StorageService } from '../../../../../core/services/storage.service'
import { AuthService } from '../../../../../core/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-stage-clinical-cases',
  imports: [SingleSelectionComponent, MultipleChoiceComponent, TextComponent, ImageComponent],
  templateUrl: './stage-clinical-cases.component.html',
  styleUrl: './stage-clinical-cases.component.scss',
})
export class StageClinicalCasesComponent implements OnInit {
  @Input() stageData: any = null

  currentQuestion: any
  isLastQuestion: boolean = false
  isEnd: boolean = false
  showAwardModal = false

  constructor(
    private localStorageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {
    console.log(this.stageData)
  }
  ngOnInit(): void {
    this.currentQuestion = this.stageData.questions[0]
  }

  nextQuestion(): void {
    const currentIndex = this.stageData.questions.indexOf(this.currentQuestion)
    this.isLastQuestion = currentIndex === this.stageData.questions.length - 1
    if (currentIndex < this.stageData.questions.length - 1) {
      this.currentQuestion = this.stageData.questions[currentIndex + 1]
    } else if (this.isLastQuestion) {
      this.isEnd = true
    }
  }

  submit(): void {
    const award = this.stageData?.viewResults?.award

    if (award) {
      this.showAwardModal = true
      this.localStorageService.setData('award', award)
    }
  }

  async closeAwardModal(): Promise<void> {
    this.showAwardModal = false
    await this.authService.finishStageForAll('3')
    this.router.navigate(['/participant/stage-waiting'])
  }

  timeUp(): void {
    this.nextQuestion()
  }
}
