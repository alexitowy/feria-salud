import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-join-event',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './join-event.component.html',
  styleUrl: './join-event.component.scss'
})
export class JoinEventComponent {
  eventCode: string = '';

  joinEvent() {
    if (this.eventCode.trim()) {
      console.log('Código ingresado:', this.eventCode);
    }
  }
}
