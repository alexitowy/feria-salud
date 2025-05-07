import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { StorageEnum } from '../../../core/models/emuns/storage.emun'
import { AuthService } from '../../../core/services/auth.service'
import { StorageService } from '../../../core/services/storage.service'
import { UtilsService } from '../../../core/services/utils.service'
import { or } from 'firebase/firestore'

@Component({
  selector: 'app-join-event',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './join-event.component.html',
  styleUrl: './join-event.component.scss',
})
export class JoinEventComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    eventCode: new FormControl(null, Validators.required),
  })

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    const userData = this.storageService.getData(StorageEnum.USER_DATA)
    if (userData) {
      this.router.navigate(['/participant/event'])
      return
    }
  }

  async joinEvent() {
    if (this.form.valid) {
      const { eventCode, name } = this.form.value
      if (!eventCode || !name) {
        this.utilsService.showToast('Por favor, completa todos los campos.', 'danger')
        return
      }
      const result = await this.authService.checkCode(eventCode)

      if (!result.valid) {
        this.utilsService.showToast('El código es incorrecto.', 'danger')
        return
      }

      if (result.started) {
        this.utilsService.showToast('El evento ya comenzó. No puedes unirte ahora.', 'danger')
        return
      }

      const userExist = await this.authService.checkUser(name)
      if (userExist) {
        this.utilsService.showToast('El nombre ya está en uso. Por favor, elige otro.', 'danger')
        return
      }
      const userData = {
        username: name,
        organizer: false,
        currentStage: 1,
        avatar: `assets/images/avatars_${Math.floor(Math.random() * 9) + 1}.png`,
      }
      await this.authService.saveUser(userData)
      this.storageService.setData(StorageEnum.USER_DATA, userData)
      this.router.navigate(['/participant/await'])
    } else {
      this.form.markAllAsTouched()
    }
  }
}
