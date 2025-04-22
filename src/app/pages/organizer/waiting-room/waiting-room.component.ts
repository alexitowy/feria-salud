import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore'
import { BehaviorSubject } from 'rxjs'
import { Participant } from './interfaces/participants.interface'
import { AuthService } from '../../../core/services/auth.service'
import { Router } from '@angular/router'
import { StorageService } from '../../../core/services/storage.service'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'

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
    private router: Router,
    private storageService: StorageService
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
      const organizerData = {
        username: 'Organizador',
        organizer: true,
      }
      this.storageService.setData(StorageEnum.USER_DATA, organizerData)
      this.router.navigate(['/organizer/dashboard'])
    } catch (err) {
      console.error('Error starting event:', err)
    } finally {
      this.isStarting = false
    }
  }
}
