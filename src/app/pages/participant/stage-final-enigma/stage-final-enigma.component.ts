import { Component, OnInit } from '@angular/core'
import { UtilsService } from '../../../core/services/utils.service'
import { CommonModule } from '@angular/common'
import { StorageService } from '../../../core/services/storage.service'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'
import { AuthService } from '../../../core/services/auth.service'
import { Router } from '@angular/router'
import { ModalFeedbackComponent } from '../event-editor/components/stage-clinical-cases/components/modal-feedback/modal-feedback.component'

@Component({
  selector: 'app-stage-final-enigma',
  imports: [CommonModule, ModalFeedbackComponent],
  templateUrl: './stage-final-enigma.component.html',
  styleUrl: './stage-final-enigma.component.scss',
})
export class StageFinalEnigmaComponent implements OnInit {
  readonly rows = [1, 2, 3, 4]
  readonly cols = ['A', 'B', 'C', 'D', 'E', 'F']
  wrongCells: string[] = []

  grid!: any[]

  awards: any[] = []
  winner: string | null = null
  winnerAlreadyNotified = false

  msg = ''
  constructor(
    private readonly utilsService: UtilsService,
    private readonly storageService: StorageService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.authService.participantsListener$.subscribe(async (participants: any[]) => {
      const userData = this.storageService.getData(StorageEnum.USER_DATA)
      const currentUserName = userData?.username
      const completed = participants?.find((p) => p['8'] === true)

      if (completed && !this.winnerAlreadyNotified) {
        if (completed.name === currentUserName) {
          this.msg = '¡Has desbloqueado el cajón de los casos clínicos!'
        } else {
          this.msg = `${completed.name} ha desbloqueado el cajón de los casos clínicos`
        }
        this.winnerAlreadyNotified = true
        await this.authService.finishStageForAll('8')
      }
    })

    this.awards = this.storageService.getData('award') || []
    this.awards = this.awards.filter((award) => award !== 'assets/images/map.jpg')
    this.grid = this.rows.flatMap((row, rowIndex) =>
      this.cols.map((col, colIndex) => {
        const width = 100 / this.cols.length
        const height = 100 / this.rows.length

        return {
          coord: `${col}${row}`,
          top: `${rowIndex * height}%`,
          left: `${colIndex * width}%`,
          width: `${width}%`,
          height: `${height}%`,
        }
      })
    )
  }

  async checkCell(coord: string) {
    if (coord === 'D4') {
      if (!this.winner) {
        const userData = this.storageService.getData(StorageEnum.USER_DATA)
        const playerName = userData?.username || 'Jugador desconocido'

        this.winner = playerName

        try {
          await this.authService.finishStage('8', 10)
          // await this.authService.completeFinalStage()
        } catch (err) {
          console.error('Error al finalizar la etapa 3', err)
        }
      }
    } else {
      if (!this.wrongCells.includes(coord)) {
        this.wrongCells.push(coord)
      }
      this.utilsService.showToast('Incorrecto, intenta de nuevo', 'danger')
    }
  }

  continue() {
    this.router.navigate(['/participant/thanks'])
  }
}
