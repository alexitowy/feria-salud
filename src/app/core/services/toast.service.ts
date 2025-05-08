// core/toast.service.ts
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export type ToastType = 'success' | 'info' | 'warning' | 'danger'
export interface ToastMessage {
  text: string
  type: ToastType
  id: number
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts$ = new BehaviorSubject<ToastMessage[]>([])

  show(text: string, type: ToastType = 'info', timeLeft: number = 7000) {
    const id = Date.now()
    const toast = { text, type, id }
    this.toasts$.next([...this.toasts$.value, toast])

    if (timeLeft > 0) {
      setTimeout(() => this.remove(id), timeLeft)
    }
  }

  remove(id: number) {
    const filteredToasts = this.toasts$.value.filter((toast) => toast.id !== id)
    this.toasts$.next(filteredToasts)
  }

  getToasts() {
    return this.toasts$.asObservable()
  }

  clearAll() {
    this.toasts$.next([])
  }
}
