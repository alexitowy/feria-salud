import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core'
import { UtilsService } from '../../../../../../../core/services/utils.service'
import { CountDownComponent } from '../../../../../../../shared/count-down/count-down.component'
import { CommonModule } from '@angular/common'
import { ModalFeedbackComponent } from '../modal-feedback/modal-feedback.component'

@Component({
  selector: 'app-image',
  imports: [CountDownComponent, CommonModule, ModalFeedbackComponent],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  @ViewChild(CountDownComponent) countDownComponent!: CountDownComponent
  @Input() question: any
  @Input() timer = true
  @Input() automaticResponse: boolean = false

  @Output() timeUp$ = new EventEmitter<boolean>()
  @Output() selected$ = new EventEmitter<number>()

  selectedAnswer: any = null
  utilsService = inject(UtilsService)
  showFeedback = false
  totalTimeLeft: number = 0

  timeUp(): void {
    this.timeUp$.emit(true)
  }

  setSelectedAnswer(answer: any): void {
    console.log('answer', answer)

    this.question.answers.forEach((ans: any) => {
      if (ans.id === answer.id) {
        ans.selected = true
      } else {
        ans.selected = false
      }
    })
    this.selectedAnswer = answer
    this.selectedAnswer.selected = true
    if (this.automaticResponse) {
      this.checkAnswer()
    }
  }

  checkAnswer(): void {
    if (this.selectedAnswer.correct) {
      if (this.timer) {
        this.countDownComponent.stop()
      }
      if (this.question.feedback) {
        this.showFeedback = true
      } else {
        this.continue()
      }
    } else {
      this.utilsService.showToast('Respuesta incorrecta, intentalo de nuevo', 'danger')
    }
  }

  updateTime(time: number): void {
    this.totalTimeLeft = time
  }

  continue() {
    this.selected$.emit(this.totalTimeLeft)
  }
}
