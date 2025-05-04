import { Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { UtilsService } from '../../../../../../../core/services/utils.service'
import { CountDownComponent } from '../../../../../../../shared/count-down/count-down.component'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-text',
  imports: [CountDownComponent, FormsModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
})
export class TextComponent {
  @Input() question: any

  @Output() timeUp$ = new EventEmitter<boolean>()
  @Output() correctSelected$ = new EventEmitter<boolean>()

  response: string = ''
  utilsService = inject(UtilsService)

  timeUp(): void {
    this.timeUp$.emit(true)
  }

  checkAnswer(): void {
    if (this.response === '') {
      this.utilsService.showToast('Debes escribir una respuesta', 'danger')
      return
    }
    if (this.response.toLowerCase() === this.question.answers[0].text.toLowerCase()) {
      this.utilsService.showToast('Respuesta correcta.', 'success')
      this.correctSelected$.emit(true)
    } else {
      this.utilsService.showToast('Respuesta incorrecta, intentalo de nuevo', 'danger')
    }
  }
}
