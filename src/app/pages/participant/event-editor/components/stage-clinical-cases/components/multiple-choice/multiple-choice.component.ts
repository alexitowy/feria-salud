import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-multiple-choice',
  imports: [],
  templateUrl: './multiple-choice.component.html',
  styleUrl: './multiple-choice.component.scss',
})
export class MultipleChoiceComponent {
  @Input() question: any

  constructor() {
    console.log(this.question)
  }
}
