// core/toast.service.ts
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export type ToastType = 'success' | 'info' | 'warning' | 'danger'
export interface ToastMessage {
  text: string
  type: ToastType
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  message$ = new BehaviorSubject<ToastMessage | null>(null)

  show(text: string, type: ToastType = 'info', timeLeft: number = 7000) {
    this.message$.next({ text, type })
    setTimeout(() => this.message$.next(null), timeLeft)
  }
}
