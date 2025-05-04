import { Component, Input } from '@angular/core'
import { StageData } from '../../interfaces/stage.interface'

@Component({
  selector: 'app-stage-bad-foot',
  imports: [],
  templateUrl: './stage-bad-foot.component.html',
  styleUrl: './stage-bad-foot.component.scss',
})
export class StageBadFootComponent {
  @Input() stageData!: StageData
}
