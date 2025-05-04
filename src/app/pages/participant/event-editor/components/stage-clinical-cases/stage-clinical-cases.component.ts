import { Component, Input, OnInit } from '@angular/core'
import { MultipleChoiceComponent } from './components/multiple-choice/multiple-choice.component'
import { SingleSelectionComponent } from './components/single-selection/single-selection.component'
import { TextComponent } from './components/text/text.component'
import { ImageComponent } from './components/image/image.component'

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

  constructor() {
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
    } else if (currentIndex === this.stageData.questions.length - 1) {
      this.isEnd = true
    }
  }

  submit(): void {
    console.log('Submit clicked')
    // Handle the submission logic here
  }

  timeUp(): void {
    this.nextQuestion()
  }
}
