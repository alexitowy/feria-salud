import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-single-selection',
  imports: [],
  templateUrl: './single-selection.component.html',
  styleUrl: './single-selection.component.scss',
})
export class SingleSelectionComponent {
  @Input() question: any

  constructor() {
    console.log(this.question)
  }
}
