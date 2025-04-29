import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { CountDownComponent } from '../../../../../shared/count-down/count-down.component'
import { ToastService } from '../../../../../core/services/toast.service'
import { StorageService } from '../../../../../core/services/storage.service'
import { Router } from '@angular/router'
import { AuthService } from '../../../../../core/services/auth.service'
import { UtilsService } from '../../../../../core/services/utils.service'

@Component({
  selector: 'app-stage-microbiota',
  standalone: true,
  imports: [NgIf, FormsModule, CountDownComponent],
  templateUrl: './stage-microbiota.component.html',
  styleUrls: ['./stage-microbiota.component.scss'],
})
export class StageMicrobiotaComponent {
  @ViewChild(CountDownComponent) countDownComponent!: CountDownComponent

  @Input() stageData: any
  @Input() currentStage = 1

  @Output() completed = new EventEmitter<void>()

  isOpen = false
  answer = ''
  hasAnswered: boolean = false
  points: number = 0

  private startTime = 0

  constructor(
    private toastService: ToastService,
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService,
    private utils: UtilsService
  ) {}

  async close() {
    this.isOpen = false
    await this.authService.finishStage(this.currentStage.toString(), this.points)
    this.router.navigate(['/participant/stage-waiting'])
  }

  showModal() {
    this.isOpen = true
    this.startTime = Date.now()
    this.hasAnswered = false
    this.answer = ''
  }

  checkAnswer() {
    if (this.hasAnswered) {
      return
    }
    this.hasAnswered = true

    const normalizedAnswer = this.answer.trim().toLowerCase()

    this.countDownComponent.stop()

    if (normalizedAnswer === this.stageData.answer.toLowerCase()) {
      this.calculateScore()
      this.utils.showToast(
        `¡Correcto! Has superado la etapa ${this.currentStage}. Puntos: ${this.points}`,
        'success'
      )

      this.close()
    } else {
      this.utils.showToast('Respuesta incorrecta. No has podido superar la etapa.', 'danger')
      this.points = 0
      this.close()
    }
  }

  onTimeUp() {
    if (!this.hasAnswered) {
      this.utils.showToast('¡Se acabó el tiempo! No respondiste a tiempo.', 'warning')
      this.points = 0
      this.hasAnswered = true
      this.close()
    }
  }

  calculateScore() {
    const elapsedTime = (Date.now() - this.startTime) / 1000
    if (elapsedTime <= 15) {
      this.points = 10
    } else if (elapsedTime <= 30) {
      this.points = Math.max(2, 10 - Math.floor((elapsedTime - 15) / 1.5))
    } else {
      this.points = 0
    }
  }
}
