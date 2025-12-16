import { Component, inject } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { BusyService } from '../../core/services/busy.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-header',
  imports: [
    MatIcon,
    MatButtonModule,
    MatBadgeModule,
    RouterLink,
    RouterLinkActive,
    MatProgressBarModule
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  busyService = inject(BusyService);
}
