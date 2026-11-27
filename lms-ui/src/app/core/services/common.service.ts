
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private objectData: any = null;

  private refreshSubject = new Subject<void>();

  // Store transaction data
  setObject(data: any): void {
    this.objectData = data;
  }

  // Retrieve transaction data
  getObject(): any {
    return this.objectData;
  }

  // Notify subscribed components
  refresh(): void {
    this.refreshSubject.next();
  }

  // Listen for refresh events
  onRefresh(): Observable<void> {
    return this.refreshSubject.asObservable();
  }

  // Clear stored data
  clearObject(): void {
    this.objectData = null;
  }
}
