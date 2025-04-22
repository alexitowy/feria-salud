import { Injectable } from '@angular/core'
import { ToastService } from './toast.service'

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private toast: ToastService) {}

  showToast(message: string, type: 'success' | 'info' | 'warning' | 'danger' = 'info') {
    this.toast.show(message, type)
  }
}
