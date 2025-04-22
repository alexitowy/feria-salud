import { AfterViewInit, Component } from '@angular/core'
import { User } from '../../../core/models/user.model'
import { Router } from '@angular/router'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'
import { AuthService } from '../../../core/services/auth.service'
import { StorageService } from '../../../core/services/storage.service'
import { Event } from '../../../core/models/event.model'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-dashboard',
  imports: [NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit {
  private video!: HTMLVideoElement
  user!: User
  event!: Event
  isOpen = false
  answer = ''
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
    this.authService.getEvent()
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
    await this.authService.completedIntro()
  }
}
