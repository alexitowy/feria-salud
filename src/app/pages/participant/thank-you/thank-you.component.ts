import { Component, OnInit } from '@angular/core'
import { StorageService } from '../../../core/services/storage.service'

@Component({
  selector: 'app-thank-you',
  imports: [],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss',
})
export class ThankYouComponent implements OnInit {
  constructor(private readonly storegeService: StorageService) {}

  ngOnInit(): void {
    this.storegeService.clearAll()
  }
}
