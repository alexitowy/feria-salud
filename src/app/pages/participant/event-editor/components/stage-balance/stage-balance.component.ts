import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop'
import { StageData } from '../../interfaces/stage.interface'
import { ToastService } from '../../../../../core/services/toast.service'
import { AuthService } from '../../../../../core/services/auth.service'
import { StorageService } from '../../../../../core/services/storage.service'
import { StorageEnum } from '../../../../../core/models/emuns/storage.emun'
import { Router } from '@angular/router'
import { ModalFeedbackComponent } from '../stage-clinical-cases/components/modal-feedback/modal-feedback.component'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-stage-balance',
  imports: [CommonModule, DragDropModule, ModalFeedbackComponent],
  templateUrl: './stage-balance.component.html',
  styleUrls: ['./stage-balance.component.scss'],
})
export class StageBalanceComponent {
  @Input() stageData!: StageData

  options = [
    { name: 'Frutas', image: '/assets/images/frutas.jpg', type: 'fruta' },
    { name: 'Vitaminas', image: '/assets/images/vitaminas.jpg', type: 'distractor' },
    { name: 'Verduras', image: '/assets/images/verduras.jpg', type: 'verdura' },
    { name: 'Antibioticos', image: '/assets/images/antibioticos.jpg', type: 'distractor' },
    { name: 'Fermentados', image: '/assets/images/fermentados.jpg', type: 'legumbre' },
    { name: 'Carnes', image: '/assets/images/carne.jpg', type: 'carne' },
    { name: 'Probioticos', image: '/assets/images/probioticos.jpg', type: 'distractor' },
  ]

  droppedItems: { image: string; x: number; y: number; type: string }[] = []

  feedbackMessage = ''
  winner: string | null = null
  winnerAlreadyNotified = false

  feedbackHtml = ''
  private participantsSub!: Subscription

  constructor(
    private toast: ToastService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.participantsSub = this.authService.participantsListener$.subscribe(
      async (participants: any[]) => {
        const userData = this.storageService.getData(StorageEnum.USER_DATA)
        const currentUserName = userData?.username

        const completed = participants.find((p) => p['2'] === true)

        if (completed && !this.winnerAlreadyNotified) {
          this.winnerAlreadyNotified = true

          if (completed.name === currentUserName) {
            this.feedbackHtml = `Habéis logrado el equilibrio… más la calma no ha de durar...<br>
                                Entre los pergaminos del curandero, una nueva revelación se deja leer:<br>
                                “Cuando el invasor regresa una y otra vez, no basta con limpiar… hay que restaurar.”`
          } else {
            this.feedbackHtml = `${completed.name} ha desbloqueado el cajón de los casos clínicos`
          }
          await this.authService.finishStageForAll('2')
          this.options = []
        }
      }
    )
  }

  onItemDropped(event: CdkDragDrop<any>) {
    const option = event.item.data

    const containerRect = (
      event.container.element.nativeElement as HTMLElement
    ).getBoundingClientRect()
    const x = event.dropPoint.x - containerRect.left
    const y = event.dropPoint.y - containerRect.top

    if (option.type === 'distractor') {
      this.feedbackMessage =
        '¿Eliminarías a todos los habitantes de una aldea para traer la paz? No todo lo que limpia... sana..'
      setTimeout(() => (this.feedbackMessage = ''), 6000)
      return
    }

    this.droppedItems.push({ image: option.image, x, y, type: option.type })
    this.options = this.options.filter((o) => o.name !== option.name)

    this.validateBalance()
  }

  async validateBalance() {
    const typesPlaced = this.droppedItems.map((item) => item.type)
    const requiredTypes = ['fruta', 'verdura', 'legumbre', 'carne']
    const isComplete = requiredTypes.every((type) => typesPlaced.includes(type))

    if (isComplete && !this.winner) {
      const userData = this.storageService.getData(StorageEnum.USER_DATA)
      const playerName = userData?.username || 'Jugador desconocido'

      this.winner = playerName

      try {
        await this.authService.finishStage('2', 10)
      } catch (err) {
        console.error('Error al finalizar la etapa 2', err)
      }

      this.options = []
    }
  }

  preventDrop(event: CdkDragDrop<any>) {}

  continue() {
    this.router.navigate(['/participant/stage-waiting'])
  }

  ngOnDestroy(): void {
    this.participantsSub?.unsubscribe()
  }
}
