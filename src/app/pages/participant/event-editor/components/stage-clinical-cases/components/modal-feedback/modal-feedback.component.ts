import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UtilsService } from '../../../../../../../core/services/utils.service'

@Component({
  selector: 'app-modal-feedback',
  imports: [CommonModule],
  templateUrl: './modal-feedback.component.html',
  styleUrl: './modal-feedback.component.scss',
})
export class ModalFeedbackComponent implements OnInit {
  @Input() feedbackHtml: string = ''
  @Input() isOpen: boolean = false
  @Input() imageUrl?: string
  @Input() title?: string
  @Input() textButton?: string = 'Continuar'

  @Output() continue = new EventEmitter<void>()

  constructor(private readonly utilsService: UtilsService) {}

  ngOnInit(): void {
    this.utilsService.clearToast()
  }
  emitContinue(): void {
    this.continue.emit()
  }
}
