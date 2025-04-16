import { Injectable } from '@angular/core'
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore'
import { environment } from '../../../enviroments/environment'
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private canContinueSubject = new BehaviorSubject<boolean>(false)
  canContinue$ = this.canContinueSubject.asObservable()
  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.login(environment.email, environment.password)
    this.listenForEventStart()
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password)
  }

  async checkCode(code: number): Promise<{ valid: boolean; started: boolean }> {
    const codeRef = doc(this.firestore, 'Config', 'code')
    const codeSnap = await getDoc(codeRef)

    if (!codeSnap.exists()) {
      return { valid: false, started: false }
    }

    const data = codeSnap.data()
    const isValidCode = data['value'] === +code
    const hasStarted = data['active'] === true

    return {
      valid: isValidCode,
      started: hasStarted,
    }
  }

  async saveUser(name: string): Promise<void> {
    const participantsRef = collection(this.firestore, 'participantes')
    await addDoc(participantsRef, {
      name,
    })
  }

  private listenForEventStart(): void {
    const eventRef = doc(this.firestore, 'Config', 'code')

    onSnapshot(eventRef, (snapshot) => {
      const data = snapshot.data()
      if (data?.['active'] === true) {
        this.canContinueSubject.next(true)
      } else {
        this.canContinueSubject.next(false)
      }
    })
  }

  async startEvent(): Promise<void> {
    const eventRef = doc(this.firestore, 'Config', 'code')

    await updateDoc(eventRef, {
      active: true,
    })
  }
}
