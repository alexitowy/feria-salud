import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setData(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  getData(key: string): any {
    const item = sessionStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }

  removeData(key: string): void {
    sessionStorage.removeItem(key)
  }

  updateData(key: string, value: any): void {
    this.setData(key, value)
  }

  clearAll(): void {
    sessionStorage.clear()
  }
}
