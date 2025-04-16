import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { AuthService } from '../../../core/services/auth.service'
import { ToastService } from '../../../core/services/toast.service'

@Component({
  selector: 'app-join-event',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './join-event.component.html',
  styleUrl: './join-event.component.scss',
})
export class JoinEventComponent implements OnInit {
  form!: FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      eventCode: [null, [Validators.required]],
      name: [null, [Validators.required]],
    })
  }

  async joinEvent() {
    if (this.form.valid) {
      const { eventCode, name } = this.form.value

      const result = await this.authService.checkCode(eventCode)
      console.log(result)

      if (!result.valid) {
        this.showToast('El código es incorrecto.', 'danger')
        return
      }

      if (result.started) {
        this.showToast('El evento ya comenzó. No puedes unirte ahora.', 'danger')
        return
      }

      await this.authService.saveUser(name)
      this.router.navigate(['/participant/await'])
    } else {
      this.form.markAllAsTouched()
    }
  }

  showToast(message: string, type: 'success' | 'info' | 'warning' | 'danger' = 'info') {
    this.toast.show(message, type)
  }
}
