import { Component, OnInit } from '@angular/core'
import { StorageService } from '../../../core/services/storage.service'
import { AuthService } from '../../../core/services/auth.service'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'
import { Router } from '@angular/router'

@Component({
  selector: 'app-thank-you',
  imports: [],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss',
})
export class ThankYouComponent implements OnInit {
  constructor(
    private readonly storegeService: StorageService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const userData = this.storegeService.getData(StorageEnum.USER_DATA)
    if (!userData) {
      this.router.navigate(['/participant/join-event'])
      return
    }
    this.storegeService.clearAll()
    this.authService.listenIfUserDeleted(userData.username, () => {
      this.router.navigate(['/participant/join'])
    })
  }
}
