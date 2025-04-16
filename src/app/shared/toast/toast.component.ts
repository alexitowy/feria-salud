import { Component } from '@angular/core'
import { ToastService } from '../../core/services/toast.service'
import { AsyncPipe, CommonModule } from '@angular/common'

@Component({
  selector: 'app-toast',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  constructor(public toast: ToastService) {}
}
