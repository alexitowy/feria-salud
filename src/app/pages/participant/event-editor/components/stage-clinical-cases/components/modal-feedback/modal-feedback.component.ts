import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-modal-feedback',
  imports: [CommonModule],
  templateUrl: './modal-feedback.component.html',
  styleUrl: './modal-feedback.component.scss',
})
export class ModalFeedbackComponent {
  @Input() feedbackHtml: string = ''
  @Input() isOpen: boolean = false
  @Input() imageUrl?: string
  @Input() title?: string

  @Output() continue = new EventEmitter<void>()

  emitContinue(): void {
    this.continue.emit()
  }
}
