import { NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'
import { Event } from '../../../core/models/event.model'
import { User } from '../../../core/models/user.model'
import { AuthService } from '../../../core/services/auth.service'
import { StorageService } from '../../../core/services/storage.service'
import { StageBadFootComponent } from './components/stage-bad-foot/stage-bad-foot.component'
import { StageBalanceComponent } from './components/stage-balance/stage-balance.component'
import { StageClinicalCasesComponent } from './components/stage-clinical-cases/stage-clinical-cases.component'
import { StageMicrobiotaComponent } from './components/stage-microbiota/stage-microbiota.component'
import { StagesData } from './constants/stages'
import { AntibioticSelectorComponent } from './components/antibiotic-selector/antibiotic-selector.component'

@Component({
  selector: 'app-event-editor',
  imports: [
    NgIf,
    FormsModule,
    StageMicrobiotaComponent,
    StageBalanceComponent,
    StageClinicalCasesComponent,
    StageBadFootComponent,
    AntibioticSelectorComponent,
  ],
  templateUrl: './event-editor.component.html',
  styleUrl: './event-editor.component.scss',
})
export class EventEditorComponent {
  user!: User
  event!: Event

  currentStage = 1
  stageData: any = null
  stagesData = StagesData

  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService
  ) {
    this.user = this.storageService.getData(StorageEnum.USER_DATA) as User
    if (!this.user) {
      this.router.navigate(['/participant/join-event'])
      return
    }
    this.authService.eventListener$.subscribe((event) => {
      this.event = event
    })
    this.authService.getEvent()
  }

  async ngOnInit(): Promise<void> {
    const stageData = await this.authService.getCurrentStageData()

    this.authService.listenIfUserDeleted(this.user.username, () => {
      this.storageService.clearAll()
      this.router.navigate(['/participant/join-event'])
    })
    if (!stageData) {
      this.currentStage = 1
      this.stageData = StagesData[1]
      return
    }

    const currentStage = stageData.currentStage || 1
    const isStageCompleted = stageData[String(currentStage)] === true

    if (currentStage === 8) {
      this.router.navigate(['/participant/final-stage'])
      return
    }

    if (isStageCompleted) {
      this.router.navigate(['/participant/stage-waiting'])
      return
    }

    this.currentStage = currentStage
    this.stageData = StagesData[this.currentStage]
  }
}
