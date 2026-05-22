import { defineBoot } from '#q-app/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';

export type MessageLanguages = keyof typeof messages;
export type MessageSchema = (typeof messages)['en'];

export default defineBoot(({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en', // ou 'pt-BR' se quiser default PT
    fallbackLocale: 'en',
    messages,
  });

  app.use(i18n);
});
