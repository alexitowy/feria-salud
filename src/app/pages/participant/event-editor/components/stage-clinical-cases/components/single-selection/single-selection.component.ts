import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core'
import { UtilsService } from '../../../../../../../core/services/utils.service'
import { CountDownComponent } from '../../../../../../../shared/count-down/count-down.component'
import { ModalFeedbackComponent } from '../modal-feedback/modal-feedback.component'

@Component({
  selector: 'app-single-selection',
  imports: [CountDownComponent, ModalFeedbackComponent],
  templateUrl: './single-selection.component.html',
  styleUrl: './single-selection.component.scss',
})
export class SingleSelectionComponent {
  @ViewChild(CountDownComponent) countDownComponent!: CountDownComponent
  @Input() question: any
  @Input() timer = true
  @Input() automaticResponse: boolean = false

  @Output() timeUp$ = new EventEmitter<boolean>()
  @Output() correctSelected$ = new EventEmitter<number>()

  selectedAnswer: any = null
  utilsService = inject(UtilsService)
  showFeedback = false
  totalTimeLeft: number = 0

  timeUp(): void {
    this.timeUp$.emit(true)
  }

  setSelectedAnswer(answer: any): void {
    this.question.answers.forEach((ans: any) => {
      if (ans.id === answer.id) {
        ans.selected = true
      } else {
        ans.selected = false
      }
    })
    this.selectedAnswer = answer
    this.selectedAnswer.selected = true
  }

  checkAnswer(): void {
    if (!this.selectedAnswer) {
      this.utilsService.showToast('Debes seleccionar una respuesta', 'danger')
      return
    }
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
    this.correctSelected$.emit(this.totalTimeLeft)
  }
}
