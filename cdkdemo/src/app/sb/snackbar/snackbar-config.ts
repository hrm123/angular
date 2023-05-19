import { InjectionToken, TemplateRef } from '@angular/core';

export class SnackbarDetail {
  type: ToastType = "info";
  text?: string;
  template?: TemplateRef<any>;
  templateContext?: {};
}

export type ToastType = 'warning' | 'info' | 'success';

export interface SnackbarConfig {
    position?: {
        top: number;
        right: number;
    };
    animation?: {
        fadeOut: number;
        fadeIn: number;
    };
}

export const defaultSnackbarConfig: SnackbarConfig = {
    position: {
        top: 20,
        right: 20,
    },
    animation: {
        fadeOut: 2500,
        fadeIn: 300,
    },
};

export const SNACKBAR_CONFIG_TOKEN = new InjectionToken('snackbar-config');