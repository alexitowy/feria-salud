import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core'
import { UtilsService } from '../../../../../../../core/services/utils.service'
import { CountDownComponent } from '../../../../../../../shared/count-down/count-down.component'
import { FormsModule } from '@angular/forms'
import { ModalFeedbackComponent } from '../modal-feedback/modal-feedback.component'

@Component({
  selector: 'app-text',
  imports: [CountDownComponent, FormsModule, ModalFeedbackComponent],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
})
export class TextComponent {
  @ViewChild(CountDownComponent) countDownComponent!: CountDownComponent
  @Input() question: any
  @Input() timer = true
  @Input() automaticResponse: boolean = false

  @Output() timeUp$ = new EventEmitter<boolean>()
  @Output() correctSelected$ = new EventEmitter<number>()

  response: string = ''
  utilsService = inject(UtilsService)
  totalTimeLeft: number = 0
  showFeedback = false

  timeUp(): void {
    this.timeUp$.emit(true)
  }

  checkAnswer(): void {
    if (this.response === '') {
      this.utilsService.showToast('Debes escribir una respuesta', 'danger')
      return
    }
    if (this.response.toLowerCase().trim() === this.question.answers[0].text.toLowerCase()) {
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
