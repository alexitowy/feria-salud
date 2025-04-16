import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore'
import { BehaviorSubject } from 'rxjs'
import { Participant } from './interfaces/participants.interface'
import { AuthService } from '../../../core/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-waiting-room',
  imports: [CommonModule],
  templateUrl: './waiting-room.component.html',
  styleUrl: './waiting-room.component.scss',
})
export class WaitingRoomComponent {
  participants$ = new BehaviorSubject<Participant[]>([])
  isStarting = false

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const participantsRef = collection(this.firestore, 'participantes')

    onSnapshot(participantsRef, (snapshot) => {
      const list: Participant[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Participant, 'id'>),
      }))

      this.participants$.next(list)
    })
  }

  trackById(index: number, item: { id: string }) {
    return item.id
  }

  async startEvent(): Promise<void> {
    this.isStarting = true

    try {
      await this.authService.startEvent()
      this.router.navigate(['/organizer/live'])
    } catch (err) {
      console.error('Error starting event:', err)
    } finally {
      this.isStarting = false
    }
  }
}
