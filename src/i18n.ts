import { createI18n } from 'vue-i18n';
import messages from '@intlify/vite-plugin-vue-i18n/messages';

export default createI18n({
    legacy: false,
    allowComposition: true,
    locale: 'ru',
    globalInjection: true,
    fallbackLocale: 'ru',
    messages,
});
