import { Injectable } from '@angular/core'
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore'
import { BehaviorSubject } from 'rxjs'
import { environment } from '../../../enviroments/environment'
import { User } from '../models/user.model'
import { StorageService } from './storage.service'
import { StorageEnum } from '../models/emuns/storage.emun'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private canContinueSubject = new BehaviorSubject<boolean>(false)
  canContinue$ = this.canContinueSubject.asObservable()
  eventListener$ = new BehaviorSubject<any>(null)
  participantsListener$ = new BehaviorSubject<any>(null)
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storageService: StorageService
  ) {
    this.login(environment.email, environment.password)
    this.listenForEvent()
    this.listenForParticipants()
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password)
  }

  async checkCode(code: number): Promise<{ valid: boolean; started: boolean }> {
    const codeRef = doc(this.firestore, 'event', 'feriaSalud')
    const eventSnasp = await getDoc(codeRef)

    if (!eventSnasp.exists()) {
      return { valid: false, started: false }
    }

    const data = eventSnasp.data()
    const isValidCode = data['code'] === +code
    const hasStarted = data['active'] === true

    return {
      valid: isValidCode,
      started: hasStarted,
    }
  }

  async checkUser(name: string): Promise<boolean> {
    const participantsRef = collection(this.firestore, 'participantes')
    const querySnapshot = await getDocs(participantsRef)

    if (!querySnapshot.empty) {
      const users = querySnapshot.docs.map((doc) => doc.data())
      const userExists = users.some((user) => user['name'] === name)
      return userExists
    }

    return false
  }

  async saveUser(user: User): Promise<void> {
    const participantsRef = collection(this.firestore, 'participantes')
    await addDoc(participantsRef, {
      name: user.username,
      organizer: user.organizer,
      avatar: user.avatar,
    })
  }

  async getEvent(): Promise<any> {
    const eventRef = doc(this.firestore, 'event', 'feriaSalud')
    const eventSnap = await getDoc(eventRef)
    if (eventSnap.exists()) {
      const data = eventSnap.data()
      this.eventListener$.next(data)
    }
  }

  async getParticipants(): Promise<any> {
    const participantsRef = collection(this.firestore, 'participantes')
    const querySnapshot = await getDocs(participantsRef)
    if (!querySnapshot.empty) {
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<any, 'id'>),
      }))
      this.participantsListener$.next(list)
    }
  }

  async deleteParticipant(participantId: string): Promise<void> {
    const participantRef = doc(this.firestore, `participantes/${participantId}`)
    await deleteDoc(participantRef)
  }

  async completedVideoIntro(): Promise<void> {
    const eventRef = doc(this.firestore, 'event', 'feriaSalud')
    await updateDoc(eventRef, {
      introVideoCompleted: true,
    })
  }

  private listenForEvent(): void {
    const eventRef = doc(this.firestore, 'event', 'feriaSalud')

    onSnapshot(eventRef, (snapshot) => {
      const data = snapshot.data()
      this.eventListener$.next(data)
      if (data?.['active'] === true) {
        this.canContinueSubject.next(true)
      } else {
        this.canContinueSubject.next(false)
      }
    })
  }

  private listenForParticipants(): void {
    const participantsRef = collection(this.firestore, 'participantes')

    onSnapshot(participantsRef, (snapshot) => {
      const data = snapshot.docs
      const list = data.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<any, 'id'>),
      }))
      this.participantsListener$.next(list)
    })
  }

  async startEvent(): Promise<void> {
    const eventRef = doc(this.firestore, 'event', 'feriaSalud')

    await updateDoc(eventRef, {
      active: true,
    })
  }

  async finishStage(stage: string, newPoints?: number, final = false): Promise<void> {
    const userData = this.storageService.getData(StorageEnum.USER_DATA)
    const username = userData?.username

    if (!username) {
      console.error('No se encontró nombre de usuario.')
      return
    }

    const participantsRef = collection(this.firestore, 'participantes')
    const q = query(participantsRef, where('name', '==', username))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      console.error('No se encontró al participante con ese nombre.')
      return
    }

    const participantDoc = querySnapshot.docs[0]
    const participantRef = doc(this.firestore, `participantes/${participantDoc.id}`)

    try {
      const updateData: any = { [stage]: true }

      if (newPoints !== undefined) {
        const participantSnap = await getDoc(participantRef)
        const currentPoints = participantSnap.data()?.['points'] || 0
        updateData.points = currentPoints + newPoints
      }

      updateData.currentStage = Number(stage)

      if (final) {
        updateData.winner = true
      }

      await updateDoc(participantRef, updateData)
    } catch (error) {
      console.error('Error actualizando la etapa:', error)
    }
  }

  async launchNextStage(): Promise<void> {
    const eventRef = doc(this.firestore, 'event', 'feriaSalud')

    try {
      await updateDoc(eventRef, {
        nextStageReady: true,
      })
    } catch (error) {
      console.error('Error lanzando la siguiente etapa', error)
    }
  }

  async getCurrentStageData(): Promise<any> {
    const userData = this.storageService.getData(StorageEnum.USER_DATA)
    const username = userData?.username

    if (!username) return null

    const participantsRef = collection(this.firestore, 'participantes')
    const q = query(participantsRef, where('name', '==', username))
    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      const doc = snapshot.docs[0]
      return {
        id: doc.id,
        ...doc.data(),
      }
    }

    return null
  }

  async resetNextStageReady(): Promise<void> {
    const eventRef = doc(this.firestore, 'event', 'feriaSalud')
    try {
      await updateDoc(eventRef, {
        nextStageReady: false,
      })
    } catch (error) {
      console.error('Error reseteando nextStageReady', error)
    }
  }

  async finishStageForAll(stage: string): Promise<void> {
    const participantsRef = collection(this.firestore, 'participantes')
    const querySnapshot = await getDocs(participantsRef)

    if (querySnapshot.empty) {
      console.error('No hay participantes para actualizar.')
      return
    }

    const promises: Promise<void>[] = []

    querySnapshot.docs.forEach((docSnap) => {
      const participantData = docSnap.data()
      const participantRef = doc(this.firestore, `participantes/${docSnap.id}`)

      if (!participantData[stage]) {
        const updateData: any = { [stage]: true }
        updateData.currentStage = Number(stage) + 1

        promises.push(updateDoc(participantRef, updateData))
      }
    })

    try {
      await Promise.all(promises)
    } catch (error) {
      console.error('Error actualizando múltiples participantes:', error)
    }
  }

  async clearParticipants(): Promise<void> {
    const participantsRef = collection(this.firestore, 'participantes')
    const querySnapshot = await getDocs(participantsRef)

    const deletePromises = querySnapshot.docs.map((docSnap) =>
      deleteDoc(doc(this.firestore, 'participantes', docSnap.id))
    )

    await Promise.all(deletePromises)
  }

  async updateEventState(
    update: Partial<{ active: boolean; introVideoCompleted: boolean; finish: boolean }>
  ): Promise<void> {
    const eventRef = doc(this.firestore, 'event', 'feriaSalud')
    await updateDoc(eventRef, update)
  }

  listenIfUserDeleted(username: string, onDelete: () => void): void {
    const participantsRef = collection(this.firestore, 'participantes')
    const q = query(participantsRef, where('name', '==', username))

    onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        this.storageService.clearAll()
        onDelete()
      }
    })
  }

  async completeFinalStage(): Promise<void> {
    const eventRef = doc(this.firestore, 'event', 'feriaSalud')
    await updateDoc(eventRef, {
      finish: true,
    })
  }

  async updateCurrentStageAuto(): Promise<void> {
    const userData = this.storageService.getData(StorageEnum.USER_DATA)
    const username = userData?.username

    if (!username) {
      console.error('No se encontró nombre de usuario.')
      return
    }

    const participantsRef = collection(this.firestore, 'participantes')
    const q = query(participantsRef, where('name', '==', username))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      console.error('No se encontró al participante con ese nombre.')
      return
    }

    const participantDoc = querySnapshot.docs[0]
    const participantRef = doc(this.firestore, `participantes/${participantDoc.id}`)

    const data = participantDoc.data()

    const completedStages = Object.keys(data)
      .filter((key) => !isNaN(Number(key)) && data[key] === true)
      .map(Number)

    const maxStage = completedStages.length > 0 ? Math.max(...completedStages) : 0
    const nextStage = maxStage + 1

    try {
      await updateDoc(participantRef, { currentStage: nextStage })
    } catch (error) {
      console.error('Error actualizando currentStage automáticamente:', error)
    }
  }

  async shouldRedirectToEvent(): Promise<boolean> {
    const userData = this.storageService.getData(StorageEnum.USER_DATA)
    if (!userData) return false

    const eventRef = doc(this.firestore, 'event', 'feriaSalud')
    const eventSnap = await getDoc(eventRef)
    return eventSnap.exists() && eventSnap.data()?.['introVideoCompleted'] === true
  }
}
