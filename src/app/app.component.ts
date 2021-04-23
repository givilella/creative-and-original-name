import { Component, OnInit } from '@angular/core';
import { Child } from './interfaces/child';
import { ChildrenService } from './services/children.service';
import * as moment from 'moment';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'creative-and-original-name';
  children: Child[] = [];

  constructor(
    private readonly childrenService: ChildrenService,
    private readonly notificationsService: NotificationsService
  ) {
    this.childrenService.loadChildren.subscribe(() => {
      this.children = this.childrenService.children;
      if (this.children.length > 0) this.checkNextSizeDate(this.children);
    });
  }

  checkNextSizeDate(children: Child[]) {
    const today = moment();
    children.forEach((child) => {
      const nextSizeDate = moment(child.next_size_date);
      const daysToNextSize = nextSizeDate.diff(today, 'days');
      const isNextSizeDate = daysToNextSize < 10;

      if (isNextSizeDate) {
        this.notificationsService.createNotification({
          _id: child.id.toString(),
          title: `${child.first_name || child.title} needs a bigger size!`,
          desc:
            daysToNextSize < 10 && daysToNextSize > 1
              ? `In ${nextSizeDate} days the child will need bigger products. Consider ordering now!`
              : 'Your child needs bigger products! ',
          action: `/children/${child.id}`,
          type: 'size',
        });
      }
    });
  }
}
