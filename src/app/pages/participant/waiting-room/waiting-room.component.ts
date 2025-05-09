import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { AuthService } from '../../../core/services/auth.service'
import { Router } from '@angular/router'
import { filter, Observable, Subscription, take } from 'rxjs'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'
import { StorageService } from '../../../core/services/storage.service'

@Component({
  selector: 'app-waiting-room',
  imports: [CommonModule],
  templateUrl: './waiting-room.component.html',
  styleUrl: './waiting-room.component.scss',
})
export class WaitingRoomComponent implements OnInit, OnDestroy {
  canContinueSub!: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const userData = this.storageService.getData(StorageEnum.USER_DATA)
    if (!userData) {
      this.router.navigate(['/participant/join-event'])
      return
    }
    this.authService.listenIfUserDeleted(userData.username, () => {
      this.router.navigate(['/participant/join'])
    })

    this.canContinueSub = this.authService.canContinue$.pipe(filter(Boolean)).subscribe(() => {
      this.router.navigate(['/participant/event'])
    })
  }

  ngOnDestroy(): void {
    this.canContinueSub?.unsubscribe()
  }
}
