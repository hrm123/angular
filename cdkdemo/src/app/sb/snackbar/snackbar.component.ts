import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { SnackbarRef } from './snackbar-ref';
import { AnimationEvent } from '@angular/animations';
import { SnackbarDetail, SNACKBAR_CONFIG_TOKEN, SnackbarConfig } from './snackbar-config';
import { snackBarAnimations, SnackbarAnimationState } from './snackbar-animation';

export interface ToastDetail {
  text: string;
}

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnDestroy {
  animationState: SnackbarAnimationState = 'default';
  iconType: string;

  private intervalId: any = null;


  constructor(
    public readonly detail: SnackbarDetail,
    readonly ref: SnackbarRef,
    @Inject(SNACKBAR_CONFIG_TOKEN) private snackbarConfig: SnackbarConfig
    ) {
      this.iconType = detail.type === 'success' ? 'done' : detail.type;
  }

  ngOnInit() {
    this.intervalId = setTimeout(() => this.animationState = 'closing', 5000);
  }

  ngOnDestroy() {
    clearTimeout(this.intervalId);
  }

  close() {
    this.ref.close();
  }

  onFadeFinished(event: AnimationEvent) {
    const { toState } = event;
    const isFadeOut = (toState as SnackbarAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }
}
