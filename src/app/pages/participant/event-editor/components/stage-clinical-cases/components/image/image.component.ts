import { Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { UtilsService } from '../../../../../../../core/services/utils.service'

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  @Input() question: any

  @Output() timeUp$ = new EventEmitter<boolean>()
  @Output() correctSelected$ = new EventEmitter<boolean>()

  selectedAnswer: any = null
  utilsService = inject(UtilsService)

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
      this.utilsService.showToast('Respuesta correcta.', 'success')
      this.correctSelected$.emit(true)
    } else {
      this.utilsService.showToast('Respuesta incorrecta, intentalo de nuevo', 'danger')
    }
  }
}
