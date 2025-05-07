import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ToastService } from '../../../../../core/services/toast.service'
import { AuthService } from '../../../../../core/services/auth.service'
import { StorageService } from '../../../../../core/services/storage.service'
import { Router } from '@angular/router'
import { StorageEnum } from '../../../../../core/models/emuns/storage.emun'

@Component({
  selector: 'app-antibiotic-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './antibiotic-selector.component.html',
  styleUrls: ['./antibiotic-selector.component.scss'],
})
export class AntibioticSelectorComponent {
  @Input() stageData: any = null
  @Input() currentStage!: number

  @Output() completed$ = new EventEmitter<void>()

  winner: string | null = null
  winnerAlreadyNotified = false

  constructor(
    private toast: ToastService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.participantsListener$.subscribe(async (participants: any[]) => {
      const userData = this.storageService.getData(StorageEnum.USER_DATA)
      const currentUserName = userData?.username

      const completed = participants.find((p) => p[this.currentStage] === true)

      if (completed && !this.winnerAlreadyNotified) {
        this.winnerAlreadyNotified = true

        if (completed.name === currentUserName) {
          this.toast.show('¡Has desbloqueado el cajón de los casos clínicos!', 'success')
        } else {
          this.toast.show(
            `${completed.name} ha desbloqueado el cajón de los casos clínicos`,
            'success'
          )
        }
        await this.authService.finishStageForAll(this.currentStage.toString())
        setTimeout(() => {
          this.router.navigate(['/participant/stage-waiting'])
        }, 2500)
      }
    })
  }

  selections: {
    [index: number]: {
      stability: string
      note: string
    }
  } = {}

  onSelectChange(event: Event, index: number, field: 'stability' | 'note'): void {
    const value = (event.target as HTMLSelectElement).value
    this.updateSelection(index, field, value)
  }

  async updateSelection(index: number, field: 'stability' | 'note', value: string): Promise<void> {
    if (!this.selections[index]) {
      this.selections[index] = {
        stability: '',
        note: '',
      }
    }

    this.selections[index][field] = value

    const antibiotics = this.stageData.antibioticChallenge.antibiotics

    const allComplete =
      Object.keys(this.selections).length === antibiotics.length &&
      Object.values(this.selections).every((sel) => sel.stability && sel.note)

    const allCorrect =
      allComplete &&
      antibiotics.every((antibiotic: any, i: number) => {
        const selection = this.selections[i]
        return (
          selection.stability === antibiotic.correct.stability &&
          selection.note === antibiotic.correct.note
        )
      })

    if (allCorrect) {
      this.completed$.emit()
      if (!this.winner) {
        const userData = this.storageService.getData(StorageEnum.USER_DATA)
        const playerName = userData?.username || 'Jugador desconocido'

        this.winner = playerName

        try {
          await this.authService.finishStage(this.currentStage.toString(), 10)
        } catch (err) {
          console.error(`Error al finalizar la etapa ${this.currentStage}`, err)
        }
      }
    }
  }

  getCardStatus(index: number): 'incomplete' | 'correct' | 'incorrect' {
    const sel = this.selections[index]
    if (!sel || !sel.stability || !sel.note) {
      return 'incomplete'
    }

    const antibiotic = this.stageData.antibioticChallenge.antibiotics[index]
    const isCorrect =
      sel.stability === antibiotic.correct.stability && sel.note === antibiotic.correct.note

    return isCorrect ? 'correct' : 'incorrect'
  }
}
