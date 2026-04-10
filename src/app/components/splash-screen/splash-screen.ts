import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.html',
  styleUrl: './splash-screen.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplashScreenComponent implements OnInit {
  visible = signal(true);
  fadeOut = signal(false);

  ngOnInit(): void {
    // Inicia el fadeout a los 1.5s, desaparece completamente a los 2s
    setTimeout(() => this.fadeOut.set(true), 1500);
    setTimeout(() => this.visible.set(false), 2300);
  }
}
