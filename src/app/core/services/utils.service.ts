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
    this.toast.show(message, type, timeLeft)
  }

  calculateScore(
    minPoints: number,
    maxPoints: number,
    totalTime: number,
    timeLeft: number
  ): number {
    let penalty = 1 - (totalTime - timeLeft) / totalTime
    let pointsEarned = maxPoints * (1 - penalty)

    if (pointsEarned < minPoints) {
      pointsEarned = minPoints
    }

    return Math.round(pointsEarned)
  }

  clearToast() {
    this.toast.clearAll()
  }
}
