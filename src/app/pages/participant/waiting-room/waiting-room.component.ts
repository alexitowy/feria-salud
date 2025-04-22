import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { AuthService } from '../../../core/services/auth.service'
import { Router } from '@angular/router'
import { filter, Observable, take } from 'rxjs'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'
import { StorageService } from '../../../core/services/storage.service'

@Component({
  selector: 'app-waiting-room',
  imports: [CommonModule],
  templateUrl: './waiting-room.component.html',
  styleUrl: './waiting-room.component.scss',
})
export class WaitingRoomComponent {
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
    this.authService.canContinue$.pipe(filter(Boolean)).subscribe((canContinue) => {
      if (canContinue) {
        this.router.navigate(['/participant/event'])
      }
    })
  }
}
