import Vue from 'vue'
import VueInternationalization from 'vue-i18n';
import vnMessage from './vi.js'
import enMessage from './en.js'
import Ls from '../services/ls'

Vue.use(VueInternationalization);

const messages = {
    vi: vnMessage,
    en: enMessage,
};

Ls.set('locale', document.head.querySelector('meta[name="locale"]').content);

const i18n = new VueInternationalization({
    locale: document.head.querySelector('meta[name="locale"]').content,
    messages,
    fallbackLocale: 'vi',
});

export default i18n