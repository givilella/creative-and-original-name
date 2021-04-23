import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/interfaces/notification';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  constructor(private readonly notificationsService: NotificationsService) {
    this.notificationsService.loadNotifications.subscribe(() => {
      this.notifications = this.notificationsService.notifications;
    });
  }

  ngOnInit(): void {
    this.notifications = this.notificationsService.notifications;
  }
}
