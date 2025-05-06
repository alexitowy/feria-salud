import { Component, OnInit } from '@angular/core'
import { UtilsService } from '../../../core/services/utils.service'
import { CommonModule } from '@angular/common'
import { StorageService } from '../../../core/services/storage.service'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'

@Component({
  selector: 'app-stage-final-enigma',
  imports: [CommonModule],
  templateUrl: './stage-final-enigma.component.html',
  styleUrl: './stage-final-enigma.component.scss',
})
export class StageFinalEnigmaComponent implements OnInit {
  readonly rows = [1, 2, 3, 4]
  readonly cols = ['A', 'B', 'C', 'D', 'E', 'F']
  wrongCells: string[] = []

  playerName: string = ''
  isCorrect = false

  grid!: any[]

  awards: any[] = []

  constructor(
    private readonly utilsService: UtilsService,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    const userData = this.storageService.getData(StorageEnum.USER_DATA)
    this.playerName = userData?.username

    this.awards = this.storageService.getData('award') || []
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

  checkCell(coord: string) {
    if (coord === 'D4') {
      this.isCorrect = true
    } else {
      if (!this.wrongCells.includes(coord)) {
        this.wrongCells.push(coord)
      }
      this.utilsService.showToast('Incorrecto, intenta de nuevo', 'danger')
    }
  }
}
