import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '../interfaces/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  loadNotifications: Subject<any> = new Subject<any>();
  private _notifications: Notification[];

  get notifications() {
    return this._notifications;
  }

  constructor() {
    this._notifications = [];
  }

  loadNotificationsSuccess() {
    this.loadNotifications.next();
  }

  createNotification(notification: Notification) {
    /* Duplicate validation */
    const thisNotification = this._notifications.find((n) => {
      return n._id === notification._id;
    });
    if (!thisNotification) {
      this._notifications.push(notification);
    }

    this.loadNotificationsSuccess();
  }
}
