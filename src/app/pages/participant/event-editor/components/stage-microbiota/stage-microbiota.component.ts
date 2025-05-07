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
  msg = ''

  constructor(
    private router: Router,
    private authService: AuthService,
    private utils: UtilsService
  ) {}

  async close() {
    this.isOpen = false
    this.router.navigate(['/participant/stage-waiting'])
    await this.authService.finishStage(this.currentStage.toString(), this.points)
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

    const normalizedAnswer = this.answer.trim().toLowerCase()

    if (normalizedAnswer === this.stageData.answer.toLowerCase()) {
      this.countDownComponent.stop()
      this.points = this.utils.calculateScore(2, 10, 60, this.totalTimeLeft)
      this.utils.showToast(`¡Correcto! puntos: ${this.points}`, 'success')
      this.msg = `El enigma del cofre ha sido resuelto, y su secreto, desvelado. Pero el descanso dura poco... Justo al lado,
      descubrís una antigua balanza, a su alrededor se disponen varios elementos...`
    } else {
      this.msg = `El enigma del cofre no ha sido resuelto...`
      this.utils.showToast('Respuesta incorrecta. 0 puntos', 'danger')
      this.points = 0
    }
    this.hasAnswered = true
  }

  onTimeUp() {
    if (!this.hasAnswered) {
      this.utils.showToast('¡Se acabó el tiempo! No respondiste a tiempo.', 'warning')
      this.points = 0
      this.msg = `El enigma del cofre no ha sido resuelto...`
      this.hasAnswered = true
    }
  }

  updateTime(totalTime: any) {
    this.totalTimeLeft = totalTime
  }
}
