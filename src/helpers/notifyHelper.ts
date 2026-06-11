import { Notify } from 'quasar';

export function notifySuccess(message: string) {
  Notify.create({
    type: 'positive',
    message,
  });
}

export function notifyError(message: string) {
  Notify.create({
    type: 'negative',
    message,
  });
}
