import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop'
import { StageData } from '../../interfaces/stage.interface'
import { ToastService } from '../../../../../core/services/toast.service'
import { AuthService } from '../../../../../core/services/auth.service'
import { StorageService } from '../../../../../core/services/storage.service'
import { StorageEnum } from '../../../../../core/models/emuns/storage.emun'
import { Router } from '@angular/router'

@Component({
  selector: 'app-stage-balance',
  imports: [CommonModule, DragDropModule],
  templateUrl: './stage-balance.component.html',
  styleUrls: ['./stage-balance.component.scss'],
})
export class StageBalanceComponent {
  @Input() stageData!: StageData

  options = [
    { name: 'Frutas', image: '/assets/images/fruits.png', type: 'fruta' },
    { name: 'Verduras', image: '/assets/images/verduras.png', type: 'verdura' },
    { name: 'Legumbres', image: '/assets/images/legumbres.png', type: 'legumbre' },
    { name: 'Fermentados', image: '/assets/images/fermentados.png', type: 'fermentado' },
    { name: 'Antidotus Universalis', image: '/assets/images/distraction.png', type: 'distractor' },
  ]

  droppedItems: { image: string; x: number; y: number; type: string }[] = []

  feedbackMessage = ''
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

      const completed = participants.find((p) => p['2'] === true)

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
        await this.authService.finishStageForAll('2')
        this.options = []
      }
    })
  }

  onItemDropped(event: CdkDragDrop<any>) {
    console.log('Dropped:', event)

    const option = event.item.data

    const containerRect = (
      event.container.element.nativeElement as HTMLElement
    ).getBoundingClientRect()
    const x = event.dropPoint.x - containerRect.left
    const y = event.dropPoint.y - containerRect.top

    if (option.type === 'distractor') {
      this.feedbackMessage =
        '¿Eliminarías a todos los habitantes de una aldea para traer la paz? No todo lo que limpia... sana..'
      setTimeout(() => (this.feedbackMessage = ''), 3000)
      return
    }

    this.droppedItems.push({ image: option.image, x, y, type: option.type })
    this.options = this.options.filter((o) => o.name !== option.name)

    this.validateBalance()
  }

  async validateBalance() {
    const typesPlaced = this.droppedItems.map((item) => item.type)
    const requiredTypes = ['fruta', 'verdura', 'legumbre', 'fermentado']
    const isComplete = requiredTypes.every((type) => typesPlaced.includes(type))

    if (isComplete && !this.winner) {
      const userData = this.storageService.getData(StorageEnum.USER_DATA)
      const playerName = userData?.username || 'Jugador desconocido'

      this.winner = playerName

      try {
        await this.authService.finishStage('2', 10)
        this.toast.show(`¡${playerName} ha desbloqueado el cajón de los casos clínicos!`, 'success')
      } catch (err) {
        console.error('Error al finalizar la etapa 2', err)
      }

      this.options = []
      setTimeout(() => {
        this.router.navigate(['/participant/stage-waiting'])
      }, 2500)
    }
  }

  preventDrop(event: CdkDragDrop<any>) {}
}
