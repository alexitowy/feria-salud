import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { AuthService } from '../../../core/services/auth.service'
import { Router } from '@angular/router'
import { filter, Observable, take } from 'rxjs'

@Component({
  selector: 'app-waiting-room',
  imports: [CommonModule],
  templateUrl: './waiting-room.component.html',
  styleUrl: './waiting-room.component.scss',
})
export class WaitingRoomComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.canContinue$.pipe(filter(Boolean)).subscribe((canContinue) => {
      if (canContinue) {
        this.router.navigate(['/participant/event'])
      }
    })
  }
}
