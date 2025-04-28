import { NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'
import { Event } from '../../../core/models/event.model'
import { User } from '../../../core/models/user.model'
import { AuthService } from '../../../core/services/auth.service'
import { StorageService } from '../../../core/services/storage.service'
import { CountDownComponent } from '../../../shared/count-down/count-down.component'

@Component({
  selector: 'app-event-editor',
  imports: [NgIf, FormsModule, CountDownComponent],
  templateUrl: './event-editor.component.html',
  styleUrl: './event-editor.component.scss',
})
export class EventEditorComponent {
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
      this.router.navigate(['/participant/join-event'])
      return
    }
    this.authService.eventListener$.subscribe((event) => {
      this.event = event
      console.log(event)
    })
    this.authService.getEvent()
  }

  close() {
    this.isOpen = false
  }

  showModal() {
    this.isOpen = true
  }

  checkAnswer() {
    if (this.answer.trim().toLocaleLowerCase() === 'microbiota') {
      //
    } else {
      //
    }
  }
}
