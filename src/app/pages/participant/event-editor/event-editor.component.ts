import { NgIf } from '@angular/common'
import { Component, ViewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'
import { Event } from '../../../core/models/event.model'
import { User } from '../../../core/models/user.model'
import { AuthService } from '../../../core/services/auth.service'
import { StorageService } from '../../../core/services/storage.service'
import { CountDownComponent } from '../../../shared/count-down/count-down.component'
import { UtilsService } from '../../../core/services/utils.service'

@Component({
  selector: 'app-event-editor',
  imports: [NgIf, FormsModule, CountDownComponent],
  templateUrl: './event-editor.component.html',
  styleUrl: './event-editor.component.scss',
})
export class EventEditorComponent {
  @ViewChild(CountDownComponent) countDownComponent!: CountDownComponent
  private video!: HTMLVideoElement
  user!: User
  event!: Event
  isOpen = false
  answer = ''
  startTime: number = 0
  points: number = 0
  hasAnswered: boolean = false

  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService,
    private utils: UtilsService
  ) {
    this.user = this.storageService.getData(StorageEnum.USER_DATA) as User
    if (!this.user) {
      this.router.navigate(['/participant/join-event'])
      return
    }
    this.authService.eventListener$.subscribe((event) => {
      this.event = event
      console.log(event)
    })
    this.authService.getEvent()
  }

  async close() {
    this.isOpen = false
    await this.authService.finishStage('1')
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

    if (normalizedAnswer === 'microbiota') {
      this.calculateScore()
      this.utils.showToast(
        `¡Correcto! Has descubierto el reino invisible. Puntos: ${this.points}`,
        'success'
      )
      this.close()
    } else {
      this.utils.showToast('Respuesta incorrecta. No has podido abrir el cofre.', 'danger')
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
