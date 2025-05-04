import { Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { CountDownComponent } from '../../../../../../../shared/count-down/count-down.component'
import { UtilsService } from '../../../../../../../core/services/utils.service'

@Component({
  selector: 'app-multiple-choice',
  imports: [CountDownComponent],
  templateUrl: './multiple-choice.component.html',
  styleUrl: './multiple-choice.component.scss',
})
export class MultipleChoiceComponent {
  @Input() question: any

  @Output() timeUp$ = new EventEmitter<boolean>()
  @Output() correctSelected$ = new EventEmitter<boolean>()
  answersSelect: any[] = []
  utilsService = inject(UtilsService)

  timeUp(): void {
    this.timeUp$.emit(true)
  }

  setAnswersSelected(answer: any): void {
    const index = this.answersSelect.findIndex((ans) => ans.id === answer.id)
    if (index === -1) {
      this.answersSelect.push(answer)
      answer.selected = true
    } else {
      this.answersSelect.splice(index, 1)
      answer.selected = false
    }
  }

  checkAnswer(): void {
    if (!this.answersSelect.length) {
      this.utilsService.showToast('Debes seleccionar al menos una respuesta', 'danger')
      return
    }
    if (
      this.answersSelect.length === this.question.answers.filter((ans: any) => ans.correct).length
    ) {
      const allCorrect = this.answersSelect.every((ans: any) => ans.correct)
      if (allCorrect) {
        this.utilsService.showToast('¡Correcto!', 'success')
        this.correctSelected$.emit(true)
      } else {
        this.utilsService.showToast('Respuestas incorrectas, intentalo de nuevo', 'danger')
      }
    } else {
      this.utilsService.showToast('Respuestas incorrectas, intentalo de nuevo', 'danger')
    }
  }
}
