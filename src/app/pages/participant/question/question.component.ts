import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-question',
  imports: [CommonModule, FormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  @Input() question!: string
  @Input() options: string[] = []

  @Output() answerSubmitted = new EventEmitter<string>()
  selectedOption: string | null = null

  submitAnswer() {
    if (this.selectedOption) {
      this.answerSubmitted.emit(this.selectedOption)
    }
  }
}
