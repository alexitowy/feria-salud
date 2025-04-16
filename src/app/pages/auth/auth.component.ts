import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from '../../core/services/auth.service'

@Component({
  selector: 'app-auth',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  form!: FormGroup

  error: string | null = null
  loading = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  async onSubmit() {
    this.error = null
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    const { email, password } = this.form.value

    try {
      this.loading = true
      // await this.authService.login(email!, password!)
      this.router.navigate(['/organizer/dashboard'])
    } catch (err: any) {
      this.error = err.message || 'Error al iniciar sesión'
    } finally {
      this.loading = false
    }
  }
}
