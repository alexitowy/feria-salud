import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-count-down',
  imports: [],
  templateUrl: './count-down.component.html',
  styleUrl: './count-down.component.scss',
})
export class CountDownComponent implements OnInit {
  @Input() seconds: number = 0
  @Input() mode: 'circle' | 'linear' = 'circle'
  @Output() timeUp = new EventEmitter<void>()
  @Output() started = new EventEmitter<void>()
  @Output() stopped = new EventEmitter<void>()

  timeLeft: string = '00:00'
  private timer: any
  public countdown: number = 0
  public circleLength = 2 * Math.PI * 45
  public circleColor: string = 'stroke-green-500'

  constructor() {}

  ngOnInit(): void {
    this.start()
  }

  start(): void {
    console.log(this.timer)

    if (!this.timer) {
      console.log('start', this.seconds)
      this.countdown = this.seconds
      this.updateDisplay()
      this.started.emit()
      this.timer = setInterval(() => {
        this.countdown--
        console.log('countdown', this.countdown)
        this.updateDisplay()
        if (this.countdown <= 0) {
          this.stop()
          this.timeUp.emit()
        }
      }, 1000)
    }
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
      this.stopped.emit()
    }
  }

  private updateDisplay(): void {
    const minutes = Math.floor(this.countdown / 60)
    const seconds = this.countdown % 60
    this.timeLeft = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    const percentage = (this.countdown / this.seconds) * 100
    if (percentage > 50) {
      this.circleColor = 'stroke-green-500'
    } else if (percentage > 25) {
      this.circleColor = 'stroke-amber-600'
    } else {
      this.circleColor = 'stroke-red-500'
    }
  }
}
