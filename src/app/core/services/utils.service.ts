import { Injectable } from '@angular/core'
import { ToastService } from './toast.service'

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private toast: ToastService) {}

  showToast(
    message: string,
    type: 'success' | 'info' | 'warning' | 'danger' = 'info',
    timeLeft: number = 7000
  ) {
    this.toast.show(message, type)
  }
}
