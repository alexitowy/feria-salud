import { AfterViewInit, Component } from '@angular/core'
import { User } from '../../../core/models/user.model'
import { Router } from '@angular/router'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'
import { AuthService } from '../../../core/services/auth.service'
import { StorageService } from '../../../core/services/storage.service'
import { Event } from '../../../core/models/event.model'
import { NgFor, NgIf } from '@angular/common'

@Component({
  selector: 'app-dashboard',
  imports: [NgIf, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit {
  private video!: HTMLVideoElement
  user!: User
  event!: Event
  participants: any[] = []
  isOpen = false
  answer = ''
  math = Math
  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService
  ) {
    this.user = this.storageService.getData(StorageEnum.USER_DATA) as User
    if (!this.user) {
      this.router.navigate(['/organizer/await'])
      return
    }
    this.authService.eventListener$.subscribe((event) => {
      this.event = event
    })
    this.authService.participantsListener$.subscribe((event) => {
      this.participants = event
    })
    this.authService.getEvent()
    this.authService.getParticipants()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.video = document.querySelector('video') as HTMLVideoElement
    }, 1000)
  }

  startVideo() {
    if (this.video) {
      this.video.play()
    }
  }

  pauseVideo() {
    if (this.video) {
      this.video.pause()
    }
  }

  async continue() {
    await this.authService.completedVideoIntro()
  }
}
