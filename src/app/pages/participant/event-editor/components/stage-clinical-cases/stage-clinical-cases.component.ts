import { Component, Input, OnInit } from '@angular/core'
import { SingleSelectionComponent } from './components/single-selection/single-selection.component'
import { MultipleChoiceComponent } from './components/multiple-choice/multiple-choice.component'

@Component({
  selector: 'app-stage-clinical-cases',
  imports: [SingleSelectionComponent, MultipleChoiceComponent],
  templateUrl: './stage-clinical-cases.component.html',
  styleUrl: './stage-clinical-cases.component.scss',
})
export class StageClinicalCasesComponent implements OnInit {
  @Input() stageData: any = null

  currentQuestion: any
  isLastQuestion: boolean = false
  isEnd: boolean = false

  constructor() {
    console.log(this.stageData)
  }
  ngOnInit(): void {
    this.currentQuestion = this.stageData.questions[0]
  }

  nextQuestion(): void {
    if (this.isEnd) {
      this.submit()
      return
    }
    const currentIndex = this.stageData.questions.indexOf(this.currentQuestion)
    this.isLastQuestion = currentIndex === this.stageData.questions.length - 1
    if (currentIndex < this.stageData.questions.length - 1) {
      this.currentQuestion = this.stageData.questions[currentIndex + 1]
    } else if (currentIndex === this.stageData.questions.length - 1) {
      this.isEnd = true
    }
  }

  submit(): void {
    console.log('Submit clicked')
    // Handle the submission logic here
  }
}
