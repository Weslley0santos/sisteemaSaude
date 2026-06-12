import { Notify } from 'quasar';

export function notifySuccess(message: string) {
  Notify.create({
    type: 'positive',
    message,
    position: 'top-right',
    timeout: 2000,
  });
}

export function notifyError(message: string) {
  Notify.create({
    type: 'negative',
    message,
    position: 'top-right',
    timeout: 2000,
  });
}
