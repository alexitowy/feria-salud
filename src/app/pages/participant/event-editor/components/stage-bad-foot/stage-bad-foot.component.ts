import { Component, Input, OnInit } from '@angular/core'
import { StageData } from '../../interfaces/stage.interface'
import { ImageComponent } from '../stage-clinical-cases/components/image/image.component'
import { AuthService } from '../../../../../core/services/auth.service'
import { Router } from '@angular/router'
import { UtilsService } from '../../../../../core/services/utils.service'
import { ToastService } from '../../../../../core/services/toast.service'
import { StorageService } from '../../../../../core/services/storage.service'
import { StorageEnum } from '../../../../../core/models/emuns/storage.emun'
import { ModalFeedbackComponent } from '../stage-clinical-cases/components/modal-feedback/modal-feedback.component'

@Component({
  selector: 'app-stage-bad-foot',
  imports: [ImageComponent, ModalFeedbackComponent],
  templateUrl: './stage-bad-foot.component.html',
  styleUrl: './stage-bad-foot.component.scss',
})
export class StageBadFootComponent implements OnInit {
  @Input() stageData: any = null

  currentQuestion: any
  isLastQuestion: boolean = false
  points: number = 0
  winner: string | null = null
  winnerAlreadyNotified = false
  feedbackHTML: string = ''

  constructor(
    private authService: AuthService,
    private router: Router,
    private utils: UtilsService,
    private toast: ToastService,
    private storageService: StorageService
  ) {
    console.log(this.stageData)
  }

  ngOnInit() {
    this.currentQuestion = this.stageData.questions[0]

    this.authService.participantsListener$.subscribe(async (participants: any[]) => {
      const userData = this.storageService.getData(StorageEnum.USER_DATA)
      const currentUserName = userData?.username

      const completed = participants.find((p) => p['4'] === true)

      if (completed && !this.winnerAlreadyNotified) {
        this.winnerAlreadyNotified = true

        if (completed.name === currentUserName) {
          this.toast.show('¡Correcto!: Staphylococcus aureus (coco gram + en racimos)', 'success')
          this.feedbackHTML = `<strong>¡Muy bien, valientes sanadores!<br>
                                Habéis superado la prueba con sabiduría.</strong><br>
                                Vuestra mente ha vencido al engaño del curandero, y por ello, el camino se abre ante vosotros.<br>
                                <strong>Ahora, escuchad con atención…</strong><br><br>
                                Los detalles del caso que se os revelarán a continuación`
        } else {
          this.toast.show(`${completed.name} ha desbloqueado`, 'success')
          this.feedbackHTML = `${completed.name} ha desbloqueado`
        }
        await this.authService.finishStageForAll('4')
      }
    })
  }

  nextQuestion(totalTimeLeft: number): void {
    this.updatePoints(totalTimeLeft)
    const currentIndex = this.stageData.questions.indexOf(this.currentQuestion)
    this.isLastQuestion = currentIndex === this.stageData.questions.length - 1
    if (currentIndex < this.stageData.questions.length - 1) {
      this.currentQuestion = this.stageData.questions[currentIndex + 1]
    } else if (this.isLastQuestion) {
      this.setWinner()
    }
  }

  submit(): void {}

  timeUp(): void {
    this.nextQuestion(-1)
  }

  updatePoints(totalTimeLeft: number): void {
    if (totalTimeLeft === -1) {
      this.points += 0
      return
    }

    this.points += this.utils.calculateScore(
      2,
      this.currentQuestion.points,
      this.currentQuestion.timeLeft,
      totalTimeLeft
    )
  }

  async setWinner() {
    if (!this.winner) {
      const userData = this.storageService.getData(StorageEnum.USER_DATA)
      const playerName = userData?.username || 'Jugador desconocido'

      this.winner = playerName

      try {
        await this.authService.finishStage('4', this.currentQuestion.points)
      } catch (err) {
        console.error('Error al finalizar la etapa 4', err)
      }
    }
  }

  continue() {
    this.router.navigate(['/participant/stage-waiting'])
  }
}
