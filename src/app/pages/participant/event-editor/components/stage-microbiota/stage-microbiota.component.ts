import { NgIf } from '@angular/common'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../../../../core/services/auth.service'
import { UtilsService } from '../../../../../core/services/utils.service'
import { CountDownComponent } from '../../../../../shared/count-down/count-down.component'

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
  totalTimeLeft: number = 0

  constructor(
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
    this.hasAnswered = false
    this.answer = ''
  }

  checkAnswer() {
    if (this.hasAnswered) {
      return
    }
    this.hasAnswered = true

    const normalizedAnswer = this.answer.trim().toLowerCase()

    if (normalizedAnswer === this.stageData.answer.toLowerCase()) {
      this.countDownComponent.stop()
      this.points = this.utils.calculateScore(2, 10, 60, this.totalTimeLeft)
      this.utils.showToast(
        `¡Correcto! Has descubierto el reino invisible. Puntos: ${this.points}`,
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

  updateTime(totalTime: any) {
    this.totalTimeLeft = totalTime
  }
}
