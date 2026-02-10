import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-shade',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="loading-shade">
      <mat-spinner diameter="50" color="accent"></mat-spinner>
    </div>
  `,
  styles: [`
    .loading-shade {
      position: absolute;
      top: 0; left: 0; bottom: 0; right: 0;
      background: rgba(255, 255, 255, 0.7);
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})

export class LoadingShade {}
